// src/types/inputs.ts

import type { CollectionQuery, DateTimeString, IntegerId, WpMeta } from "./common.js";
import type { CommentingStatus, CommentStatus, PingStatus, PostStatus } from "./entities.js";

export interface PostCollectionQuery extends CollectionQuery {
	readonly categories?: readonly IntegerId[] | IntegerId;
	readonly categories_exclude?: readonly IntegerId[] | IntegerId;
	readonly tags?: readonly IntegerId[] | IntegerId;
	readonly tags_exclude?: readonly IntegerId[] | IntegerId;
	readonly sticky?: boolean;
}

export interface PageCollectionQuery extends CollectionQuery {
	readonly parent?: readonly IntegerId[] | IntegerId;
	readonly parent_exclude?: readonly IntegerId[] | IntegerId;
	readonly menu_order?: number;
}

export interface TermCollectionQuery extends CollectionQuery {
	readonly hide_empty?: boolean;
	readonly parent?: IntegerId;
	readonly post?: IntegerId;
}

export interface CommentCollectionQuery extends CollectionQuery {
	readonly post?: readonly IntegerId[] | IntegerId;
	readonly parent?: readonly IntegerId[] | IntegerId;
	readonly parent_exclude?: readonly IntegerId[] | IntegerId;
	readonly status?: CommentStatus | readonly CommentStatus[];
	readonly type?: string;
	readonly password?: string;
}

export interface MediaCollectionQuery extends CollectionQuery {
	readonly media_type?: string;
	readonly mime_type?: string;
	readonly parent?: readonly IntegerId[] | IntegerId;
	readonly parent_exclude?: readonly IntegerId[] | IntegerId;
}

export interface UserCollectionQuery extends CollectionQuery {
	readonly roles?: readonly string[] | string;
	readonly capabilities?: readonly string[] | string;
	readonly who?: "authors" | string;
	readonly has_published_posts?: boolean | readonly string[];
}

export interface SearchQuery extends CollectionQuery {
	readonly type?: "post" | "term" | "post-format" | string;
	readonly subtype?: string | readonly string[];
}

export interface CreatePostInput {
	readonly date?: DateTimeString | null;
	readonly date_gmt?: DateTimeString | null;
	readonly slug?: string;
	readonly status?: PostStatus;
	readonly password?: string;
	readonly title?: string | { readonly raw?: string; readonly rendered?: string };
	readonly content?: string | { readonly raw?: string; readonly rendered?: string };
	readonly author?: IntegerId;
	readonly excerpt?: string | { readonly raw?: string; readonly rendered?: string };
	readonly featured_media?: IntegerId;
	readonly comment_status?: CommentingStatus;
	readonly ping_status?: PingStatus;
	readonly format?: string;
	readonly meta?: WpMeta;
	readonly sticky?: boolean;
	readonly template?: string;
	readonly categories?: readonly IntegerId[];
	readonly tags?: readonly IntegerId[];
}

export interface UpdatePostInput extends Partial<CreatePostInput> {}

export interface CreatePageInput extends Omit<CreatePostInput, "categories" | "tags" | "sticky" | "format"> {
	readonly parent?: IntegerId;
	readonly menu_order?: number;
}
export interface UpdatePageInput extends Partial<CreatePageInput> {}

export interface CreateTermInput {
	readonly name: string;
	readonly description?: string;
	readonly slug?: string;
	readonly parent?: IntegerId;
	readonly meta?: WpMeta;
}
export interface UpdateTermInput extends Partial<CreateTermInput> {}

export interface CreateCommentInput {
	readonly author?: IntegerId;
	readonly author_email?: string;
	readonly author_name?: string;
	readonly author_url?: string;
	readonly content: string;
	readonly date?: DateTimeString;
	readonly date_gmt?: DateTimeString;
	readonly parent?: IntegerId;
	readonly post: IntegerId;
	readonly status?: CommentStatus;
	readonly meta?: WpMeta;
}
export interface UpdateCommentInput extends Partial<CreateCommentInput> {}

export interface CreateMediaInput {
	readonly file: Blob | ArrayBuffer | Uint8Array;
	readonly filename: string;
	readonly mimeType?: string;
	readonly title?: string;
	readonly caption?: string;
	readonly description?: string;
	readonly alt_text?: string;
	readonly post?: IntegerId;
	readonly status?: PostStatus;
}
export interface UpdateMediaInput {
	readonly title?: string;
	readonly caption?: string;
	readonly description?: string;
	readonly alt_text?: string;
	readonly post?: IntegerId;
	readonly status?: PostStatus;
	readonly meta?: WpMeta;
}

export interface CreateUserInput {
	readonly username: string;
	readonly email: string;
	readonly password: string;
	readonly name?: string;
	readonly first_name?: string;
	readonly last_name?: string;
	readonly url?: string;
	readonly description?: string;
	readonly locale?: string;
	readonly nickname?: string;
	readonly roles?: readonly string[];
	readonly meta?: WpMeta;
}
export interface UpdateUserInput extends Partial<Omit<CreateUserInput, "username">> {}

export interface CreateApplicationPasswordInput {
	readonly name: string;
	readonly app_id?: string;
}

export interface CreatePluginInput {
	readonly slug: string;
	readonly status?: "inactive" | "active";
}

export interface UpdatePluginInput {
	readonly status: "inactive" | "active";
}
