// src/integrations/next/next-wordpress-http-client.ts

import type { HttpClient, HttpRequest, HttpResponse } from "../../index.js";
import type { NextFetchInit, NextFetchOptions } from "./types.js";

export type NextWordPressHttpClientOptions = NextFetchOptions;

export class NextWordPressHttpClient implements HttpClient {
	public constructor(private readonly options: NextWordPressHttpClientOptions = {}) {}

	public async send<T>(request: HttpRequest): Promise<HttpResponse<T>> {
		const init: NextFetchInit = {
			method: request.method,
			headers: request.headers,
			...(request.body !== undefined ? { body: request.body } : {}),
			...(request.signal !== undefined ? { signal: request.signal } : {}),
			...(this.options.cache !== undefined ? { cache: this.options.cache } : {}),
			...(this.options.next !== undefined ? { next: createNextFetchConfig(this.options.next) } : {}),
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

function createNextFetchConfig(next: NonNullable<NextFetchOptions["next"]>): NonNullable<NextFetchInit["next"]> {
	return {
		...(next.revalidate !== undefined ? { revalidate: next.revalidate } : {}),
		...(next.tags !== undefined ? { tags: [...next.tags] } : {}),
	};
}
