// src/utils/query.ts

export function appendQuery(url: URL, query?: Record<string, unknown>): URL {
	if (!query) return url;

	for (const [key, value] of Object.entries(query)) {
		if (value === undefined || value === null) continue;
		if (Array.isArray(value)) {
			url.searchParams.set(key, value.join(","));
			continue;
		}
		if (typeof value === "boolean") {
			url.searchParams.set(key, value ? "true" : "false");
			continue;
		}
		url.searchParams.set(key, String(value));
	}

	return url;
}

export function joinUrl(baseUrl: string, path: string): URL {
	const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
	const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
	return new URL(normalizedPath, normalizedBase);
}
