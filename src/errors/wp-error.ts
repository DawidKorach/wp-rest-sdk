// src/errors/wp-error.ts

export interface WordPressErrorPayload {
	readonly code?: string;
	readonly message?: string;
	readonly data?: unknown;
	readonly [key: string]: unknown;
}

export class WordPressHttpError extends Error {
	public override readonly name = "WordPressHttpError";
	public constructor(
		message: string,
		public readonly status: number,
		public readonly statusText: string,
		public readonly payload: WordPressErrorPayload | unknown,
		public readonly responseHeaders: Headers,
	) {
		super(message);
	}
}

export class WordPressTimeoutError extends Error {
	public override readonly name = "WordPressTimeoutError";
	public constructor(public readonly timeoutMs: number) {
		super(`WordPress REST request timed out after ${timeoutMs}ms.`);
	}
}
