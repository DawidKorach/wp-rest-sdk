# WordPress REST SDK

Strongly typed TypeScript SDK for the WordPress REST API `wp/v2`.

## Design approach

The SDK exposes a **class-based public API** and uses small, functional, dependency-injected components internally.

Why this shape:

- WordPress resources naturally map to stable SDK properties such as `posts`, `media`, `users`, `settings`, and `taxonomies`.
- A class-based facade keeps the public contract easy to discover and stable across releases.
- Testability is preserved through injected `HttpClient`, `AuthStrategy`, and resource classes without global state.
- Runtime performance differences between class-based and functional SDK APIs are negligible compared with HTTP I/O. The important production concerns are request cancellation, retry policy, pagination, clear errors, and dependency control.

## Supported areas

The SDK includes ready-to-use resources for the main WordPress REST API areas:

- posts, pages, media, comments,
- categories, tags, custom taxonomies through `terms(restBase)`,
- users and application passwords,
- settings and search,
- post types, taxonomies, and statuses,
- themes and plugins,
- blocks, block types, block patterns, block pattern categories, block directory search, rendered blocks,
- menus, menu items, and menu locations,
- navigation entities,
- templates, template parts, and global styles,
- sidebars, widget types, and widgets,
- custom REST resources through `custom(restBase)`,
- low-level escape hatch through `client.request<T>()`.

Some newer or highly dynamic WordPress endpoints intentionally use `WpGenericEntity`. Their runtime schema can depend on the WordPress version, active theme, installed plugins, registered custom post types, registered taxonomies, and site editor configuration. The SDK therefore keeps those areas extensible instead of pretending to provide complete static types for schemas that are site-specific.

See [`ENDPOINT_COVERAGE.md`](./ENDPOINT_COVERAGE.md) for the endpoint map derived from the bundled WordPress REST API reference.

## Installation

```bash
npm install @da-core/wp-rest-sdk
```

```bash
pnpm add @da-core/wp-rest-sdk
```

```bash
yarn add @da-core/wp-rest-sdk
```

```bash
bun add @da-core/wp-rest-sdk
```

For local development from this repository:

```bash
npm install
npm run typecheck
npm run build
```

## Basic usage

```ts
import { createWordPressSdk } from "@da-core/wp-rest-sdk";

const wp = createWordPressSdk({
	baseUrl: "https://example.com",
	auth: {
		type: "application-password",
		username: "editor",
		applicationPassword: "xxxx xxxx xxxx xxxx xxxx xxxx",
	},
	timeoutMs: 15_000,
	retry: { retries: 2 },
});

const posts = await wp.posts.list({
	per_page: 10,
	status: "publish",
	_fields: ["id", "slug", "title", "link"],
});

const draft = await wp.posts.create({
	title: "New post",
	content: "<p>Post content</p>",
	status: "draft",
});
```

## Authentication

Built-in authentication strategies:

```ts
type AuthConfig =
	| { readonly type?: "none" }
	| { readonly type: "application-password"; readonly username: string; readonly applicationPassword: string }
	| { readonly type: "basic"; readonly username: string; readonly password: string }
	| { readonly type: "bearer"; readonly token: string }
	| { readonly type: "nonce"; readonly nonce: string }
	| { readonly type: "custom"; readonly strategy: AuthStrategy };
```

`application-password` is the recommended built-in option for server-to-server WordPress integrations when OAuth or a custom authentication layer is not used.

## Pagination

```ts
const page = await wp.posts.list({ page: 1, per_page: 100 });

console.log(page.items);
console.log(page.total);
console.log(page.totalPages);
```

The SDK reads WordPress pagination headers:

- `X-WP-Total`,
- `X-WP-TotalPages`.

## Custom post types

If a WordPress site exposes a custom post type with `rest_base = "books"`:

```ts
interface Book {
	readonly id: number;
	readonly title: { readonly rendered: string };
	readonly acf?: { readonly isbn?: string };
}

const books = wp.custom<Book>("books");
const result = await books.list({ per_page: 20 });
```

## Custom taxonomies

```ts
const brands = wp.terms("brand");
const terms = await brands.list({ hide_empty: false });
```

## Media upload

```ts
const media = await wp.media.upload({
	file: await file.arrayBuffer(),
	filename: "image.jpg",
	mimeType: "image/jpeg",
	alt_text: "Accessible image description",
});
```

## Low-level requests

```ts
const result = await wp.client.request<MyResponse>("GET", "posts");
```

The path is relative to the configured REST namespace. The default namespace is `wp/v2`.

For plugin APIs, create a separate SDK instance:

```ts
const pluginApi = createWordPressSdk({
	baseUrl: "https://example.com",
	namespace: "my-plugin/v1",
});
```

## Error handling

HTTP errors are reported as `WordPressHttpError` and include:

- HTTP status code,
- status text,
- parsed WordPress error payload when available,
- response headers.

Timeouts are reported as `WordPressTimeoutError`.

```ts
import { WordPressHttpError, WordPressTimeoutError } from "@da-core/wp-rest-sdk";

try {
	await wp.posts.get(123);
} catch (error) {
	if (error instanceof WordPressHttpError) {
		console.error(error.status, error.payload);
	}

	if (error instanceof WordPressTimeoutError) {
		console.error(`Request timed out after ${error.timeoutMs}ms.`);
	}
}
```

## Production decisions

- Class-based public API: stable, discoverable, and convenient for larger applications.
- Injected `HttpClient`: allows replacing `fetch` with adapters for logging, metrics, tracing, caching, or circuit breakers.
- Injected `AuthStrategy`: the SDK is not locked into one authentication model.
- No runtime dependencies: smaller supply-chain surface and simpler deployment.
- Explicit but pragmatic models: core resources have concrete types; dynamic WordPress areas remain generic and extensible.
- Low-level escape hatch: `client.request<T>()` keeps the SDK useful even when a plugin exposes custom REST routes.

## Future TODO

- Generate site-specific types from the `/wp-json` index of a concrete WordPress installation.
- Add optional runtime validation adapters such as Zod, Valibot, or Effect Schema.
- Add HTTP cache support using `ETag` and `Last-Modified`.
- Add observability hooks for logging, tracing, and metrics.
- Add an automatic `listAll` paginator.
- Add contract tests against a disposable WordPress container.
- Add dedicated adapters for popular custom-field plugins where schemas are predictable enough.
