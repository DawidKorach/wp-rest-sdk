// src/resources/comments.ts

import type { WpComment } from "../types/entities.js";
import type { CommentCollectionQuery, CreateCommentInput, UpdateCommentInput } from "../types/inputs.js";
import type { WordPressRestClient } from "../wp-rest-client.js";
import { CrudResource } from "./base-resource.js";

export class CommentsResource extends CrudResource<
	WpComment,
	CreateCommentInput,
	UpdateCommentInput,
	CommentCollectionQuery
> {
	public constructor(client: WordPressRestClient) {
		super(client, "comments");
	}
}
