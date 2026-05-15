// src/resources/base-resource.ts

import type { CollectionQuery, IntegerId, WpCollection } from "../types/common.js";
import type { RequestConfig, WordPressRestClient } from "../wp-rest-client.js";

export interface DeleteOptions {
	readonly force?: boolean;
	readonly reassign?: IntegerId;
}

export interface DeleteResult<TEntity> {
	readonly deleted?: boolean;
	readonly previous?: TEntity;
	readonly [field: string]: unknown;
}

export class ReadonlyResource<TEntity, TQuery extends CollectionQuery = CollectionQuery> {
	public constructor(
		protected readonly client: WordPressRestClient,
		protected readonly path: string,
	) {}

	public list(query?: TQuery, options?: RequestConfig): Promise<WpCollection<TEntity>> {
		return this.client.list<TEntity>(this.path, { ...options, query });
	}

	public get(id: IntegerId | string, query?: Record<string, unknown>, options?: RequestConfig): Promise<TEntity> {
		return this.client.get<TEntity>(`${this.path}/${id}`, { ...options, query });
	}
}

export class CrudResource<
	TEntity,
	TCreate extends object,
	TUpdate extends object,
	TQuery extends CollectionQuery = CollectionQuery,
> extends ReadonlyResource<TEntity, TQuery> {
	public create(input: TCreate, options?: RequestConfig<TCreate>): Promise<TEntity> {
		return this.client.post<TEntity, TCreate>(this.path, { ...options, body: input });
	}

	public update(id: IntegerId | string, input: TUpdate, options?: RequestConfig<TUpdate>): Promise<TEntity> {
		return this.client.post<TEntity, TUpdate>(`${this.path}/${id}`, { ...options, body: input });
	}

	public delete(id: IntegerId | string, options?: DeleteOptions & RequestConfig): Promise<DeleteResult<TEntity>> {
		const { force, reassign, ...requestOptions } = options ?? {};
		return this.client.delete<DeleteResult<TEntity>>(`${this.path}/${id}`, {
			...requestOptions,
			query: { force, reassign },
		});
	}
}
