// src/types/entities.ts

import type {
	DateTimeString,
	GuidValue,
	HtmlString,
	IntegerId,
	RenderedValue,
	Slug,
	UriString,
	WpMeta,
	WpNullable,
} from "./common.js";

export type PostStatus = "publish" | "future" | "draft" | "pending" | "private" | string;
export type CommentStatus = "approved" | "hold" | "spam" | "trash" | string;
export type PingStatus = "open" | "closed";
export type CommentingStatus = "open" | "closed";
export type MediaType = "image" | "file" | string;

export interface WpLinks {
	readonly self?: readonly { readonly href: string }[];
	readonly collection?: readonly { readonly href: string }[];
	readonly about?: readonly { readonly href: string }[];
	readonly author?: readonly { readonly embeddable?: boolean; readonly href: string }[];
	readonly replies?: readonly { readonly embeddable?: boolean; readonly href: string }[];
	readonly [rel: string]: unknown;
}

export interface WpEntityBase {
	readonly id: IntegerId;
	readonly slug?: Slug;
	readonly link?: UriString;
	readonly _links?: WpLinks;
	readonly [field: string]: unknown;
}

export interface WpPost extends WpEntityBase {
	readonly date: WpNullable<DateTimeString>;
	readonly date_gmt: WpNullable<DateTimeString>;
	readonly guid: GuidValue;
	readonly modified: DateTimeString;
	readonly modified_gmt: DateTimeString;
	readonly status: PostStatus;
	readonly type: string;
	readonly password?: string;
	readonly permalink_template?: string;
	readonly generated_slug?: string;
	readonly title: RenderedValue;
	readonly content: RenderedValue;
	readonly author: IntegerId;
	readonly excerpt: RenderedValue;
	readonly featured_media: IntegerId;
	readonly comment_status: CommentingStatus;
	readonly ping_status: PingStatus;
	readonly format: string;
	readonly meta: WpMeta;
	readonly sticky: boolean;
	readonly template: string;
	readonly categories: readonly IntegerId[];
	readonly tags: readonly IntegerId[];
}

export interface WpPage extends Omit<WpPost, "categories" | "tags" | "sticky" | "format"> {
	readonly parent: IntegerId;
	readonly menu_order: number;
}

export interface WpTerm extends WpEntityBase {
	readonly count: number;
	readonly description: string;
	readonly name: string;
	readonly taxonomy: string;
	readonly meta?: WpMeta;
	readonly parent?: IntegerId;
}

export interface WpComment extends WpEntityBase {
	readonly author: IntegerId;
	readonly author_email?: string;
	readonly author_ip?: string;
	readonly author_name: string;
	readonly author_url: string;
	readonly author_user_agent?: string;
	readonly content: RenderedValue;
	readonly date: DateTimeString;
	readonly date_gmt: DateTimeString;
	readonly parent: IntegerId;
	readonly post: IntegerId;
	readonly status: CommentStatus;
	readonly type: string;
	readonly meta?: WpMeta;
}

export interface WpMediaSize {
	readonly file?: string;
	readonly width?: number;
	readonly height?: number;
	readonly mime_type?: string;
	readonly source_url?: UriString;
}

export interface WpMediaDetails {
	readonly width?: number;
	readonly height?: number;
	readonly file?: string;
	readonly filesize?: number;
	readonly sizes?: Record<string, WpMediaSize>;
	readonly image_meta?: Record<string, unknown>;
	readonly [field: string]: unknown;
}

export interface WpMedia extends WpEntityBase {
	readonly date: DateTimeString;
	readonly date_gmt: DateTimeString;
	readonly guid: GuidValue;
	readonly modified: DateTimeString;
	readonly modified_gmt: DateTimeString;
	readonly status: PostStatus;
	readonly type: "attachment" | string;
	readonly title: RenderedValue;
	readonly author: IntegerId;
	readonly comment_status: CommentingStatus;
	readonly ping_status: PingStatus;
	readonly meta: WpMeta;
	readonly template: string;
	readonly alt_text: string;
	readonly caption: RenderedValue;
	readonly description: RenderedValue;
	readonly media_type: MediaType;
	readonly mime_type: string;
	readonly media_details: WpMediaDetails;
	readonly post: IntegerId;
	readonly source_url: UriString;
}

export interface WpUser extends WpEntityBase {
	readonly username?: string;
	readonly name: string;
	readonly first_name?: string;
	readonly last_name?: string;
	readonly email?: string;
	readonly url: string;
	readonly description: string;
	readonly locale?: string;
	readonly nickname?: string;
	readonly registered_date?: DateTimeString;
	readonly roles?: readonly string[];
	readonly capabilities?: Record<string, boolean>;
	readonly extra_capabilities?: Record<string, boolean>;
	readonly avatar_urls: Record<string, UriString>;
	readonly meta?: WpMeta;
}

export interface WpPostType extends WpEntityBase {
	readonly description: string;
	readonly hierarchical: boolean;
	readonly has_archive: boolean | string;
	readonly name: string;
	readonly slug: string;
	readonly taxonomies: readonly string[];
	readonly rest_base: string;
}

export interface WpTaxonomy extends WpEntityBase {
	readonly capabilities: Record<string, string>;
	readonly description: string;
	readonly hierarchical: boolean;
	readonly labels: Record<string, string>;
	readonly name: string;
	readonly slug: string;
	readonly types: readonly string[];
	readonly rest_base: string;
}

export interface WpStatus extends WpEntityBase {
	readonly name: string;
	readonly private: boolean;
	readonly protected: boolean;
	readonly public: boolean;
	readonly queryable: boolean;
	readonly show_in_list: boolean;
	readonly slug: string;
}

export interface WpSearchResult {
	readonly id: IntegerId | string;
	readonly title: string;
	readonly url: UriString;
	readonly type: string;
	readonly subtype: string;
}

export interface WpPlugin {
	readonly plugin: string;
	readonly status: "inactive" | "active" | string;
	readonly name: string;
	readonly plugin_uri: UriString;
	readonly author: HtmlString;
	readonly author_uri: UriString;
	readonly description: { readonly raw: string; readonly rendered: string };
	readonly version: string;
	readonly network_only: boolean;
	readonly requires_wp: string;
	readonly requires_php: string;
	readonly textdomain: string;
}

export interface WpTheme {
	readonly stylesheet: string;
	readonly template: string;
	readonly status: string;
	readonly name: { readonly raw: string; readonly rendered: string };
	readonly description: { readonly raw: string; readonly rendered: string };
	readonly author: { readonly raw: string; readonly rendered: string };
	readonly version: string;
	readonly screenshot: UriString;
	readonly tags: Record<string, string>;
}

export interface WpSettings extends Record<string, unknown> {
	readonly title?: string;
	readonly description?: string;
	readonly url?: UriString;
	readonly email?: string;
	readonly timezone?: string;
	readonly date_format?: string;
	readonly time_format?: string;
	readonly start_of_week?: number;
	readonly language?: string;
	readonly use_smilies?: boolean;
	readonly default_category?: number;
	readonly default_post_format?: string;
	readonly posts_per_page?: number;
}

export interface WpApplicationPassword extends WpEntityBase {
	readonly uuid: string;
	readonly app_id: string;
	readonly name: string;
	readonly password?: string;
	readonly created: DateTimeString;
	readonly last_used: DateTimeString | null;
	readonly last_ip: string | null;
}

export interface WpGenericEntity extends WpEntityBase {}
