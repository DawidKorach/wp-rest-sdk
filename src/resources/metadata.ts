// src/resources/metadata.ts

import type { CollectionQuery } from "../types/common.js";
import type {
	WpApplicationPassword,
	WpGenericEntity,
	WpPlugin,
	WpPostType,
	WpSearchResult,
	WpSettings,
	WpStatus,
	WpTaxonomy,
	WpTheme,
} from "../types/entities.js";
import type {
	CreateApplicationPasswordInput,
	CreatePluginInput,
	SearchQuery,
	UpdatePluginInput,
} from "../types/inputs.js";
import type { WordPressRestClient } from "../wp-rest-client.js";
import { CrudResource, ReadonlyResource } from "./base-resource.js";

export class PostTypesResource extends ReadonlyResource<WpPostType> {
	public constructor(client: WordPressRestClient) {
		super(client, "types");
	}
}
export class TaxonomiesResource extends ReadonlyResource<WpTaxonomy> {
	public constructor(client: WordPressRestClient) {
		super(client, "taxonomies");
	}
}
export class StatusesResource extends ReadonlyResource<WpStatus> {
	public constructor(client: WordPressRestClient) {
		super(client, "statuses");
	}
}
export class SearchResource extends ReadonlyResource<WpSearchResult, SearchQuery> {
	public constructor(client: WordPressRestClient) {
		super(client, "search");
	}
}
export class ThemesResource extends ReadonlyResource<WpTheme> {
	public constructor(client: WordPressRestClient) {
		super(client, "themes");
	}
}

export class SettingsResource {
	public constructor(private readonly client: WordPressRestClient) {}
	public get(): Promise<WpSettings> {
		return this.client.get<WpSettings>("settings");
	}
	public update(input: Partial<WpSettings>): Promise<WpSettings> {
		return this.client.post<WpSettings, Partial<WpSettings>>("settings", { body: input });
	}
}

export class PluginsResource extends CrudResource<WpPlugin, CreatePluginInput, UpdatePluginInput, CollectionQuery> {
	public constructor(client: WordPressRestClient) {
		super(client, "plugins");
	}
}

export class ApplicationPasswordsResource extends CrudResource<
	WpApplicationPassword,
	CreateApplicationPasswordInput,
	Partial<CreateApplicationPasswordInput>,
	CollectionQuery
> {
	public constructor(client: WordPressRestClient, userId: number | "me") {
		super(client, `users/${userId}/application-passwords`);
	}
	public introspect(): Promise<WpApplicationPassword> {
		return this.client.get<WpApplicationPassword>(`${this.path}/introspect`);
	}
}

export class GenericResource<TEntity extends WpGenericEntity = WpGenericEntity> extends CrudResource<
	TEntity,
	Record<string, unknown>,
	Record<string, unknown>,
	CollectionQuery
> {}
