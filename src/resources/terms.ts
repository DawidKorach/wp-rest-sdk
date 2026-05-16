// src/resources/terms.ts

import type { WpTerm } from "../types/entities.js";
import type { CreateTermInput, TermCollectionQuery, UpdateTermInput } from "../types/inputs.js";
import type { WordPressRestClient } from "../wp-rest-client.js";
import { CrudResource } from "./base-resource.js";

export class CategoriesResource extends CrudResource<WpTerm, CreateTermInput, UpdateTermInput, TermCollectionQuery> {
	public constructor(client: WordPressRestClient) {
		super(client, "categories");
	}
}

export class TagsResource extends CrudResource<WpTerm, CreateTermInput, UpdateTermInput, TermCollectionQuery> {
	public constructor(client: WordPressRestClient) {
		super(client, "tags");
	}
}

export class TermsResource extends CrudResource<WpTerm, CreateTermInput, UpdateTermInput, TermCollectionQuery> {}
