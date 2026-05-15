// src/resources/users.ts

import type { WpUser } from "../types/entities.js";
import type { CreateUserInput, UpdateUserInput, UserCollectionQuery } from "../types/inputs.js";
import type { WordPressRestClient } from "../wp-rest-client.js";
import { CrudResource } from "./base-resource.js";

export class UsersResource extends CrudResource<WpUser, CreateUserInput, UpdateUserInput, UserCollectionQuery> {
	public constructor(client: WordPressRestClient) {
		super(client, "users");
	}
	public me(query?: Record<string, unknown>): Promise<WpUser> {
		return this.client.get<WpUser>("users/me", { query });
	}
	public updateMe(input: UpdateUserInput): Promise<WpUser> {
		return this.client.post<WpUser, UpdateUserInput>("users/me", { body: input });
	}
}
