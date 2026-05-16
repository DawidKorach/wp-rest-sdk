// src/integrations/next/types.ts

export type NextFetchOptions = {
	readonly cache?: RequestCache;
	readonly next?: {
		readonly revalidate?: number | false;
		readonly tags?: readonly string[];
	};
};

export type NextFetchInit = RequestInit & {
	next?: {
		revalidate?: number | false;
		tags?: string[];
	};
};
