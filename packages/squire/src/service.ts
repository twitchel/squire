import type { Store } from "./interfaces";
import { logger } from "toolbox";
import type { ProductDto, RepositoryDto, SecurityAdvisoryDto } from "./models";

export function initService(store: Store) {
	return {
		async createProduct(name: string, tags: string[]): Promise<void> {
			const result = await store.insertProduct(name, tags);

			if (result.error) {
				logger.error({ error: result.error }, "Error creating product");
				throw new Error("error creating product");
			}
		},
		async getAllProducts(): Promise<ProductDto[]> {
			const results = await store.getAllProducts();

			if (results.error) {
				logger.error({ error: results.error }, "Error fetching products");
				throw new Error("error fetching products");
			}

			logger.info({ totalProducts: results.data?.length }, "Fetched products");

			const products: ProductDto[] = [...(results.data as ProductDto[])];

			return products;
		},
		async getSecurityAdvisoryByProductId(
			productId: string,
		): Promise<SecurityAdvisoryDto[]> {
			const results = await store.getSecurityAdvisoryByProductId(productId, 10);

			if (results.error) {
				logger.error(
					{ error: results.error },
					"Error fetching security advisories",
				);
				throw new Error("error fetching security advisories");
			}

			logger.info(
				{ totalAdvisories: results.data?.length },
				"Fetched security advisories",
			);

			const advisories: SecurityAdvisoryDto[] = [
				...(results.data as SecurityAdvisoryDto[]),
			];

			return advisories;
		},
		async getReposByProductId(productId: string): Promise<RepositoryDto[]> {
			const results = await store.getReposByProductId(productId);

			if (results.error) {
				logger.error({ error: results.error }, "Error fetching repos");
				throw new Error("error fetching repos");
			}

			logger.info({ totalRepos: results.data?.length }, "Fetched repos");

			const repos: RepositoryDto[] = [...(results.data as RepositoryDto[])];

			return repos;
		},
	};
}
