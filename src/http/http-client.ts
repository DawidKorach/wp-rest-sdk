// src/http/http-client.ts

export interface HttpRequest {
	readonly url: URL;
	readonly method: string;
	readonly headers: Headers;
	readonly body?: BodyInit | null | undefined;
	readonly signal?: AbortSignal | undefined;
}

export interface HttpResponse<T = unknown> {
	readonly status: number;
	readonly statusText: string;
	readonly headers: Headers;
	readonly data: T;
}

export interface HttpClient {
	send<T>(request: HttpRequest): Promise<HttpResponse<T>>;
}

export class FetchHttpClient implements HttpClient {
	public async send<T>(request: HttpRequest): Promise<HttpResponse<T>> {
		const init: RequestInit = {
			method: request.method,
			headers: request.headers,
			...(request.body !== undefined ? { body: request.body } : {}),
			...(request.signal !== undefined ? { signal: request.signal } : {}),
		};
		const response = await fetch(request.url, init);

		const contentType = response.headers.get("content-type") ?? "";
		const data = contentType.includes("application/json")
			? ((await response.json()) as T)
			: ((await response.text()) as T);

		return {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			data,
		};
	}
}
