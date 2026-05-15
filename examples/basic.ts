// examples/basic.ts

import { createWordPressSdk } from "@da-core/wordpress-sdk";

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
console.log(
	posts.total,
	posts.items.map((post) => post.title.rendered),
);

const created = await wp.posts.create({
	title: "SDK-created post",
	content: "<p>Hello from strongly typed TypeScript SDK.</p>",
	status: "draft",
});
console.log(created.id);
