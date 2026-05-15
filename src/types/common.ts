// src/types/common.ts

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export type JsonObject = { readonly [key: string]: JsonValue };
export type MutableJsonObject = { [key: string]: JsonValue };

export type IntegerId = number;
export type DateTimeString = string;
export type UriString = string;
export type HtmlString = string;
export type Slug = string;

export type WordPressContext = "view" | "edit" | "embed";
export type Order = "asc" | "desc";

export type WpMeta = Record<string, unknown>;

export interface RenderedValue {
	readonly rendered: string;
	readonly protected?: boolean;
	readonly raw?: string;
	readonly block_version?: number;
}

export interface GuidValue {
	readonly rendered: string;
	readonly raw?: string;
}

export interface CollectionQuery {
	readonly context?: WordPressContext;
	readonly page?: number;
	readonly per_page?: number;
	readonly search?: string;
	readonly after?: DateTimeString;
	readonly modified_after?: DateTimeString;
	readonly author?: number | readonly number[];
	readonly author_exclude?: number | readonly number[];
	readonly before?: DateTimeString;
	readonly modified_before?: DateTimeString;
	readonly exclude?: readonly number[];
	readonly include?: readonly number[];
	readonly offset?: number;
	readonly order?: Order;
	readonly orderby?: string;
	readonly slug?: string | readonly string[];
	readonly status?: string | readonly string[];
	readonly _fields?: string | readonly string[];
	readonly _embed?: boolean | string | readonly string[];
	readonly [parameter: string]: unknown;
}

export interface WpCollection<TItem> {
	readonly items: readonly TItem[];
	readonly total?: number | undefined;
	readonly totalPages?: number | undefined;
	readonly links?: Headers | undefined;
}

export interface WpRequestOptions {
	readonly signal?: AbortSignal | undefined;
	readonly headers?: HeadersInit | undefined;
	readonly timeoutMs?: number | undefined;
}

export type WpNullable<T> = T | null;
