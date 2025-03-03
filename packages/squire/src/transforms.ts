import { randomUUID } from "node:crypto";
import type {
	PullRequest,
	Repository,
	VulnerabilityAlerts,
} from "squire-github";
import type {
	AdvisorySeverity,
	ModelPullRequest,
	ModelRepository,
	ModelSecurity,
} from "./models";

export function generateRepoFromGhModel(
	ghRepo: Repository,
	owner: string,
	topic: string,
): ModelRepository {
	return {
		id: randomUUID(),
		name: ghRepo.name,
		url: ghRepo.url,
		topic,
		owner,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}

export function generateSecurityFromGhModel(
	ghRepo: Repository,
	repositoryName: string,
): ModelSecurity[] {
	return ghRepo.vulnerabilityAlerts.nodes.map((edge) => {
		return transformToSecurityModel(edge, repositoryName);
	});
}

function transformToSecurityModel(
	edge: VulnerabilityAlerts,
	repositoryName: string,
): ModelSecurity {
	return {
		id: randomUUID(),
		externalId: edge.id,
		repositoryName,
		state: edge.state,
		packageName: edge.securityVulnerability.package.name,
		severity: edge.securityVulnerability.advisory.severity,
		patchedVersion:
			edge.securityVulnerability?.firstPatchedVersion?.identifier ?? null,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}

export function generatePullRequestFromGhModel(
	nodes: Repository,
	repositoryName: string,
	owner: string,
	repoName: string,
): ModelPullRequest[] {
	return nodes.pullRequests.nodes.map((node) => {
		return transformToPullRequestFromGhModel(
			node,
			repositoryName,
			owner,
			repoName,
		);
	});
}

function transformToPullRequestFromGhModel(
	node: PullRequest,
	repositoryName: string,
	owner: string,
	repoName: string,
): ModelPullRequest {
	return {
		id: randomUUID(),
		externalId: node.id,
		title: node.title,
		repositoryName,
		repoOwner: owner,
		repoName,
		url: node.permalink,
		state: node.state,
		author: node.author.login,
		mergedAt: node.mergedAt,
		createdAt: node.createdAt,
		updatedAt: new Date(),
	};
}

/**
 * Returns a weighting for the severity of an advisory
 * @param severity advisory severity weighting
 */
export function severityWeighting(severity: AdvisorySeverity): number {
	switch (severity) {
		case "LOW":
			return 1;
		case "MODERATE":
			return 2;
		case "HIGH":
			return 3;
		case "CRITICAL":
			return 4;
		default:
			return 0;
	}
}
