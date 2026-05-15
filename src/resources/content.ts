// src/resources/content.ts

import type { WpGenericEntity } from "../types/entities.js";
import type { WordPressRestClient } from "../wp-rest-client.js";
import { CrudResource, ReadonlyResource } from "./base-resource.js";

export class BlocksResource extends CrudResource<WpGenericEntity, Record<string, unknown>, Record<string, unknown>> {
	public constructor(client: WordPressRestClient) {
		super(client, "blocks");
	}
}
export class BlockTypesResource extends ReadonlyResource<WpGenericEntity> {
	public constructor(client: WordPressRestClient) {
		super(client, "block-types");
	}
}
export class BlockDirectoryItemsResource extends ReadonlyResource<WpGenericEntity> {
	public constructor(client: WordPressRestClient) {
		super(client, "block-directory/search");
	}
}
export class BlockPatternsResource extends ReadonlyResource<WpGenericEntity> {
	public constructor(client: WordPressRestClient) {
		super(client, "block-patterns/patterns");
	}
}
export class BlockPatternCategoriesResource extends ReadonlyResource<WpGenericEntity> {
	public constructor(client: WordPressRestClient) {
		super(client, "block-patterns/categories");
	}
}
export class PatternDirectoryItemsResource extends ReadonlyResource<WpGenericEntity> {
	public constructor(client: WordPressRestClient) {
		super(client, "pattern-directory/patterns");
	}
}
export class RenderedBlocksResource extends ReadonlyResource<WpGenericEntity> {
	public constructor(client: WordPressRestClient) {
		super(client, "block-renderer");
	}
}
