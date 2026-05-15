// src/wp-rest-client.ts

import { type AuthConfig, type AuthStrategy, createAuthStrategy } from "./auth/auth.js";
import { WordPressHttpError, WordPressTimeoutError } from "./errors/wp-error.js";
import { FetchHttpClient, type HttpClient, type HttpResponse } from "./http/http-client.js";
import { defaultRetryPolicy, delay, type RetryPolicy, shouldRetry } from "./http/retry.js";
import type { WpCollection, WpRequestOptions } from "./types/common.js";
import { appendQuery, joinUrl } from "./utils/query.js";

export interface WordPressClientConfig {
	readonly baseUrl: string;
	readonly namespace?: string;
	readonly auth?: AuthConfig;
	readonly headers?: HeadersInit;
	readonly httpClient?: HttpClient;
	readonly timeoutMs?: number;
	readonly retry?: Partial<RetryPolicy>;
}

export interface RequestConfig<TBody = unknown> extends WpRequestOptions {
	readonly query?: Record<string, unknown> | undefined;
	readonly body?: TBody | undefined;
	readonly rawBody?: BodyInit | undefined;
}

export class WordPressRestClient {
	public readonly baseUrl: string;
	public readonly namespace: string;
	private readonly auth: AuthStrategy;
	private readonly http: HttpClient;
	private readonly defaultHeaders: Headers;
	private readonly timeoutMs: number | undefined;
	private readonly retryPolicy: RetryPolicy;

	public constructor(config: WordPressClientConfig) {
		this.baseUrl = config.baseUrl.endsWith("/") ? config.baseUrl : `${config.baseUrl}/`;
		this.namespace = config.namespace ?? "wp/v2";
		this.auth = createAuthStrategy(config.auth);
		this.http = config.httpClient ?? new FetchHttpClient();
		this.defaultHeaders = new Headers(config.headers);
		this.timeoutMs = config.timeoutMs;
		this.retryPolicy = { ...defaultRetryPolicy, ...config.retry };
	}

	public endpoint(path: string): string {
		const cleanNamespace = this.namespace.replace(/^\/+|\/+$/g, "");
		const cleanPath = path.replace(/^\/+/, "");
		return `/wp-json/${cleanNamespace}/${cleanPath}`;
	}

	public async get<T>(path: string, config: RequestConfig = {}): Promise<T> {
		return this.request<T>("GET", path, config);
	}

	public async list<T>(path: string, config: RequestConfig = {}): Promise<WpCollection<T>> {
		const response = await this.requestWithResponse<readonly T[]>("GET", path, config);
		return {
			items: response.data,
			total: numberHeader(response.headers, "X-WP-Total"),
			totalPages: numberHeader(response.headers, "X-WP-TotalPages"),
			links: response.headers,
		};
	}

	public async post<T, TBody = unknown>(path: string, config: RequestConfig<TBody> = {}): Promise<T> {
		return this.request<T, TBody>("POST", path, config);
	}

	public async put<T, TBody = unknown>(path: string, config: RequestConfig<TBody> = {}): Promise<T> {
		return this.request<T, TBody>("PUT", path, config);
	}

	public async patch<T, TBody = unknown>(path: string, config: RequestConfig<TBody> = {}): Promise<T> {
		return this.request<T, TBody>("PATCH", path, config);
	}

	public async delete<T>(path: string, config: RequestConfig = {}): Promise<T> {
		return this.request<T>("DELETE", path, config);
	}

	public async request<T, TBody = unknown>(
		method: string,
		path: string,
		config: RequestConfig<TBody> = {},
	): Promise<T> {
		const response = await this.requestWithResponse<T, TBody>(method, path, config);
		return response.data;
	}

	public async requestWithResponse<T, TBody = unknown>(
		method: string,
		path: string,
		config: RequestConfig<TBody> = {},
	): Promise<HttpResponse<T>> {
		const url = appendQuery(joinUrl(this.baseUrl, this.endpoint(path)), config.query);
		const headers = new Headers(this.defaultHeaders);
		mergeHeaders(headers, config.headers);

		let body: BodyInit | undefined;
		if (config.rawBody !== undefined) {
			body = config.rawBody;
		} else if (config.body !== undefined) {
			headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");
			body = JSON.stringify(config.body);
		}

		const timeoutMs = config.timeoutMs ?? this.timeoutMs;
		const abortController = timeoutMs ? new AbortController() : undefined;
		const signal = composeSignal(config.signal, abortController?.signal);
		let timeoutId: ReturnType<typeof setTimeout> | undefined;
		if (timeoutMs && abortController) {
			timeoutId = setTimeout(() => abortController.abort(new WordPressTimeoutError(timeoutMs)), timeoutMs);
		}

		try {
			await this.auth.apply({ url, method, headers });
			let attempt = 0;
			while (true) {
				const request = {
					url,
					method,
					headers,
					...(body !== undefined ? { body } : {}),
					...(signal !== undefined ? { signal } : {}),
				};
				const response = await this.http.send<T>(request);
				if (response.status >= 200 && response.status < 300) return response;

				if (attempt < this.retryPolicy.retries && shouldRetry(response.status, this.retryPolicy)) {
					attempt += 1;
					await delay(this.retryPolicy.baseDelayMs * 2 ** (attempt - 1));
					continue;
				}

				const message =
					extractErrorMessage(response.data) ?? `WordPress REST request failed with HTTP ${response.status}.`;
				throw new WordPressHttpError(
					message,
					response.status,
					response.statusText,
					response.data,
					response.headers,
				);
			}
		} catch (error) {
			if (error instanceof WordPressTimeoutError) throw error;
			if (error instanceof DOMException && error.name === "AbortError" && timeoutMs) {
				throw new WordPressTimeoutError(timeoutMs);
			}
			throw error;
		} finally {
			if (timeoutId) clearTimeout(timeoutId);
		}
	}
}

function mergeHeaders(target: Headers, source?: HeadersInit): void {
	if (!source) return;
	new Headers(source).forEach((value, key) => {
		target.set(key, value);
	});
}

function numberHeader(headers: Headers, name: string): number | undefined {
	const value = headers.get(name);
	if (!value) return undefined;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : undefined;
}

function extractErrorMessage(payload: unknown): string | undefined {
	if (typeof payload === "object" && payload && "message" in payload) {
		const message = (payload as { readonly message?: unknown }).message;
		return typeof message === "string" ? message : undefined;
	}
	return undefined;
}

function composeSignal(a?: AbortSignal, b?: AbortSignal): AbortSignal | undefined {
	if (!a) return b;
	if (!b) return a;
	const controller = new AbortController();
	const abort = () => controller.abort(a.reason ?? b.reason);
	a.addEventListener("abort", abort, { once: true });
	b.addEventListener("abort", abort, { once: true });
	return controller.signal;
}
