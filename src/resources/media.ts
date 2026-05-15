// src/resources/media.ts

import type { WpMedia } from "../types/entities.js";
import type { CreateMediaInput, MediaCollectionQuery, UpdateMediaInput } from "../types/inputs.js";
import type { WordPressRestClient } from "../wp-rest-client.js";
import { CrudResource } from "./base-resource.js";

export class MediaResource extends CrudResource<
	WpMedia,
	Omit<CreateMediaInput, "file" | "filename" | "mimeType">,
	UpdateMediaInput,
	MediaCollectionQuery
> {
	public constructor(client: WordPressRestClient) {
		super(client, "media");
	}

	public async upload(input: CreateMediaInput): Promise<WpMedia> {
		const headers = new Headers();
		headers.set("Content-Disposition", `attachment; filename="${input.filename.replaceAll('"', '\\"')}"`);
		if (input.mimeType) headers.set("Content-Type", input.mimeType);

		const query: Record<string, unknown> = {};
		for (const key of ["title", "caption", "description", "alt_text", "post", "status"] as const) {
			const value = input[key];
			if (value !== undefined) query[key] = value;
		}

		const rawBody = toMediaBody(input.file);

		return this.client.post<WpMedia>("media", { headers, rawBody, query });
	}
}

function toMediaBody(file: CreateMediaInput["file"]): BodyInit {
	if (file instanceof Blob || file instanceof ArrayBuffer) {
		return file;
	}

	// Uint8Array.buffer is typed as ArrayBufferLike in newer TypeScript versions,
	// because it may theoretically be backed by SharedArrayBuffer. BodyInit does not
	// accept SharedArrayBuffer, so we intentionally copy bytes into a fresh ArrayBuffer.
	const bytes = new Uint8Array(file.byteLength);
	bytes.set(file);
	return bytes.buffer;
}
