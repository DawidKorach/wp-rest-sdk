// src/resources/site-editor.ts

import type { WpGenericEntity } from "../types/entities.js";
import type { WordPressRestClient } from "../wp-rest-client.js";
import { CrudResource, ReadonlyResource } from "./base-resource.js";

export class MenusResource extends CrudResource<WpGenericEntity, Record<string, unknown>, Record<string, unknown>> {
	public constructor(client: WordPressRestClient) {
		super(client, "menus");
	}
}
export class MenuItemsResource extends CrudResource<WpGenericEntity, Record<string, unknown>, Record<string, unknown>> {
	public constructor(client: WordPressRestClient) {
		super(client, "menu-items");
	}
}
export class MenuLocationsResource extends ReadonlyResource<WpGenericEntity> {
	public constructor(client: WordPressRestClient) {
		super(client, "menu-locations");
	}
}
export class NavigationFallbacksResource extends ReadonlyResource<WpGenericEntity> {
	public constructor(client: WordPressRestClient) {
		super(client, "navigation-fallback");
	}
}
export class NavigationsResource extends CrudResource<
	WpGenericEntity,
	Record<string, unknown>,
	Record<string, unknown>
> {
	public constructor(client: WordPressRestClient) {
		super(client, "wp_navigation");
	}
}
export class TemplatesResource extends CrudResource<WpGenericEntity, Record<string, unknown>, Record<string, unknown>> {
	public constructor(client: WordPressRestClient) {
		super(client, "templates");
	}
}
export class TemplatePartsResource extends CrudResource<
	WpGenericEntity,
	Record<string, unknown>,
	Record<string, unknown>
> {
	public constructor(client: WordPressRestClient) {
		super(client, "template-parts");
	}
}
export class GlobalStylesResource extends CrudResource<
	WpGenericEntity,
	Record<string, unknown>,
	Record<string, unknown>
> {
	public constructor(client: WordPressRestClient) {
		super(client, "global-styles");
	}
}
export class SidebarsResource extends CrudResource<WpGenericEntity, Record<string, unknown>, Record<string, unknown>> {
	public constructor(client: WordPressRestClient) {
		super(client, "sidebars");
	}
}
export class WidgetTypesResource extends ReadonlyResource<WpGenericEntity> {
	public constructor(client: WordPressRestClient) {
		super(client, "widget-types");
	}
}
export class WidgetsResource extends CrudResource<WpGenericEntity, Record<string, unknown>, Record<string, unknown>> {
	public constructor(client: WordPressRestClient) {
		super(client, "widgets");
	}
}
