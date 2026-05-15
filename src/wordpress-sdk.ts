// src/wordpress-sdk.ts

import { CommentsResource } from "./resources/comments.js";
import {
	BlockDirectoryItemsResource,
	BlockPatternCategoriesResource,
	BlockPatternsResource,
	BlocksResource,
	BlockTypesResource,
	PatternDirectoryItemsResource,
	RenderedBlocksResource,
} from "./resources/content.js";
import { MediaResource } from "./resources/media.js";
import {
	ApplicationPasswordsResource,
	GenericResource,
	PluginsResource,
	PostTypesResource,
	SearchResource,
	SettingsResource,
	StatusesResource,
	TaxonomiesResource,
	ThemesResource,
} from "./resources/metadata.js";
import { PagesResource, PostsResource } from "./resources/posts.js";
import {
	GlobalStylesResource,
	MenuItemsResource,
	MenuLocationsResource,
	MenusResource,
	NavigationFallbacksResource,
	NavigationsResource,
	SidebarsResource,
	TemplatePartsResource,
	TemplatesResource,
	WidgetsResource,
	WidgetTypesResource,
} from "./resources/site-editor.js";
import { CategoriesResource, TagsResource, TermsResource } from "./resources/terms.js";
import { UsersResource } from "./resources/users.js";
import type { WpGenericEntity } from "./types/entities.js";
import { type WordPressClientConfig, WordPressRestClient } from "./wp-rest-client.js";

export class WordPressSdk {
	public readonly client: WordPressRestClient;

	public readonly posts: PostsResource;
	public readonly pages: PagesResource;
	public readonly media: MediaResource;
	public readonly comments: CommentsResource;
	public readonly categories: CategoriesResource;
	public readonly tags: TagsResource;
	public readonly users: UsersResource;
	public readonly settings: SettingsResource;
	public readonly search: SearchResource;
	public readonly postTypes: PostTypesResource;
	public readonly taxonomies: TaxonomiesResource;
	public readonly statuses: StatusesResource;
	public readonly themes: ThemesResource;
	public readonly plugins: PluginsResource;

	public readonly blocks: BlocksResource;
	public readonly blockTypes: BlockTypesResource;
	public readonly blockDirectoryItems: BlockDirectoryItemsResource;
	public readonly blockPatterns: BlockPatternsResource;
	public readonly blockPatternCategories: BlockPatternCategoriesResource;
	public readonly patternDirectoryItems: PatternDirectoryItemsResource;
	public readonly renderedBlocks: RenderedBlocksResource;

	public readonly menus: MenusResource;
	public readonly menuItems: MenuItemsResource;
	public readonly menuLocations: MenuLocationsResource;
	public readonly navigationFallbacks: NavigationFallbacksResource;
	public readonly navigations: NavigationsResource;
	public readonly templates: TemplatesResource;
	public readonly templateParts: TemplatePartsResource;
	public readonly globalStyles: GlobalStylesResource;
	public readonly sidebars: SidebarsResource;
	public readonly widgetTypes: WidgetTypesResource;
	public readonly widgets: WidgetsResource;

	public constructor(config: WordPressClientConfig) {
		this.client = new WordPressRestClient(config);
		this.posts = new PostsResource(this.client);
		this.pages = new PagesResource(this.client);
		this.media = new MediaResource(this.client);
		this.comments = new CommentsResource(this.client);
		this.categories = new CategoriesResource(this.client);
		this.tags = new TagsResource(this.client);
		this.users = new UsersResource(this.client);
		this.settings = new SettingsResource(this.client);
		this.search = new SearchResource(this.client);
		this.postTypes = new PostTypesResource(this.client);
		this.taxonomies = new TaxonomiesResource(this.client);
		this.statuses = new StatusesResource(this.client);
		this.themes = new ThemesResource(this.client);
		this.plugins = new PluginsResource(this.client);

		this.blocks = new BlocksResource(this.client);
		this.blockTypes = new BlockTypesResource(this.client);
		this.blockDirectoryItems = new BlockDirectoryItemsResource(this.client);
		this.blockPatterns = new BlockPatternsResource(this.client);
		this.blockPatternCategories = new BlockPatternCategoriesResource(this.client);
		this.patternDirectoryItems = new PatternDirectoryItemsResource(this.client);
		this.renderedBlocks = new RenderedBlocksResource(this.client);

		this.menus = new MenusResource(this.client);
		this.menuItems = new MenuItemsResource(this.client);
		this.menuLocations = new MenuLocationsResource(this.client);
		this.navigationFallbacks = new NavigationFallbacksResource(this.client);
		this.navigations = new NavigationsResource(this.client);
		this.templates = new TemplatesResource(this.client);
		this.templateParts = new TemplatePartsResource(this.client);
		this.globalStyles = new GlobalStylesResource(this.client);
		this.sidebars = new SidebarsResource(this.client);
		this.widgetTypes = new WidgetTypesResource(this.client);
		this.widgets = new WidgetsResource(this.client);
	}

	public terms(taxonomyRestBase: string): TermsResource {
		return new TermsResource(this.client, taxonomyRestBase);
	}

	public applicationPasswords(userId: number | "me"): ApplicationPasswordsResource {
		return new ApplicationPasswordsResource(this.client, userId);
	}

	public custom<TEntity extends WpGenericEntity = WpGenericEntity>(restBase: string): GenericResource<TEntity> {
		return new GenericResource<TEntity>(this.client, restBase);
	}
}

export function createWordPressSdk(config: WordPressClientConfig): WordPressSdk {
	return new WordPressSdk(config);
}
