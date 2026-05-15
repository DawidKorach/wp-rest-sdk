// src/resources/posts.ts

import type { WpPage, WpPost } from "../types/entities.js";
import type {
	CreatePageInput,
	CreatePostInput,
	PageCollectionQuery,
	PostCollectionQuery,
	UpdatePageInput,
	UpdatePostInput,
} from "../types/inputs.js";
import type { WordPressRestClient } from "../wp-rest-client.js";
import { CrudResource } from "./base-resource.js";

export class PostsResource extends CrudResource<WpPost, CreatePostInput, UpdatePostInput, PostCollectionQuery> {
	public constructor(client: WordPressRestClient) {
		super(client, "posts");
	}
	public revisions(postId: number) {
		return this.client.list<unknown>(`posts/${postId}/revisions`);
	}
	public autosaves(postId: number) {
		return this.client.list<unknown>(`posts/${postId}/autosaves`);
	}
}

export class PagesResource extends CrudResource<WpPage, CreatePageInput, UpdatePageInput, PageCollectionQuery> {
	public constructor(client: WordPressRestClient) {
		super(client, "pages");
	}
	public revisions(pageId: number) {
		return this.client.list<unknown>(`pages/${pageId}/revisions`);
	}
	public autosaves(pageId: number) {
		return this.client.list<unknown>(`pages/${pageId}/autosaves`);
	}
}
