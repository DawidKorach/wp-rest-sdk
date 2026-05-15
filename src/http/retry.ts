// src/http/retry.ts

export interface RetryPolicy {
	readonly retries: number;
	readonly baseDelayMs: number;
	readonly retryOnStatuses: readonly number[];
}

export const defaultRetryPolicy: RetryPolicy = {
	retries: 0,
	baseDelayMs: 250,
	retryOnStatuses: [408, 425, 429, 500, 502, 503, 504],
};

export function shouldRetry(status: number, policy: RetryPolicy): boolean {
	return policy.retryOnStatuses.includes(status);
}

export async function delay(ms: number): Promise<void> {
	await new Promise((resolve) => setTimeout(resolve, ms));
}
