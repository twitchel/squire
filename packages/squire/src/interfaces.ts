import type {
	ModelProduct,
	ModelPullRequest,
	ModelRepository,
	ModelSecurity,
	ModelSecurityAdvisory,
	StoreActionResult,
} from "./models";

export interface Store {
	bulkInsertRepos(repos: ModelRepository[]): Promise<StoreActionResult>;
	bulkInsertSecVulnerabilities(
		securities: ModelSecurity[],
	): Promise<StoreActionResult>;
	bulkInsertPullRequests(
		pullRequests: ModelPullRequest[],
	): Promise<StoreActionResult>;
	initTables(): Promise<StoreActionResult>;
	getSecurityAdvisoryByProductId(
		productId: string,
		limit: number,
	): Promise<StoreActionResult<ModelSecurityAdvisory[]>>;
	getAllSecurityAdvisory(
		limit?: number,
	): Promise<StoreActionResult<ModelSecurityAdvisory[]>>;
	getReposByProductId(
		productId: string,
	): Promise<StoreActionResult<ModelRepository[]>>;
	insertProduct(name: string, tags: string[]): Promise<StoreActionResult>;
	updateProduct({
		id,
		name,
		tags,
	}: {
		id: string;
		name: string;
		tags: string[];
	}): Promise<StoreActionResult>;
	getProductById(id: string): Promise<StoreActionResult<ModelProduct>>;
	deleteProduct(id: string): Promise<StoreActionResult>;
	getAllProductTags(): Promise<StoreActionResult<string[]>>;
	getAllProducts(): Promise<StoreActionResult<ModelProduct[]>>;
	getOpenPullRequestsByProductId(
		id: string,
	): Promise<StoreActionResult<ModelPullRequest[]>>;
	getOpenPullRequests(): Promise<StoreActionResult<ModelPullRequest[]>>;
}
