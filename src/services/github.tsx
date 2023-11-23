import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: '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', // Replace with your GitHub token
});

export const fetchRepositories = async (searchValue: string) => {
  try {
    const response = await octokit.request('GET /search/repositories', {
      q: searchValue,
    });

    const repositories = response.data.items.map((repo: any) => ({
      name: repo.name,
      full_name: repo.full_name,
      owner_login: repo.owner.login,
    }));
    return repositories;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};


export interface CommitActivity {
  days: number[];
  total: number;
  week: number;
}
export const fetchCommitActivity = async (owner: string, repo: string) => {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return response.data as CommitActivity[];
  } catch (error) {
    console.error('Error fetching commit activity:', error);
    throw error;
  }
};
