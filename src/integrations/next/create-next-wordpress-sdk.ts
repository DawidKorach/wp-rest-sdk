// src/integrations/next/create-next-wordpress-sdk.ts

import { createWordPressSdk, type WordPressSdk } from "../../wordpress-sdk.js";
import type { WordPressClientConfig } from "../../wp-rest-client.js";
import { NextWordPressHttpClient, type NextWordPressHttpClientOptions } from "./next-wordpress-http-client.js";

export type CreateNextWordPressSdkConfig = Omit<WordPressClientConfig, "httpClient"> & {
	readonly nextFetch?: NextWordPressHttpClientOptions;
};

export function createNextWordPressSdk(config: CreateNextWordPressSdkConfig): WordPressSdk {
	const { nextFetch, ...sdkConfig } = config;

	return createWordPressSdk({
		...sdkConfig,
		httpClient: new NextWordPressHttpClient(nextFetch),
	});
}
