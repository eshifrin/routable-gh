import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";

export type Repo = {
  name: string;
  owner: string;
  url: string;
};

export type Issue = {
  assigneeAvatar?: string;
  assigneeName: string;
  created: string;
  lastUpdated: string;
  id: number;
  title: string;
};

// hack to get type of a single repo - the actual api for /user/repos uses 'any'
type listUserRepo = Endpoints["GET /repos/:owner/:repo"]["response"];
type listIssuesResponse = Endpoints["GET /issues"]["response"];

class Api {
  private client: Octokit;
  constructor(token: string) {
    this.client = new Octokit({ auth: token });
  }

  getRepos = async (): Promise<Repo[]> => {
    try {
      const repos = await this.client.repos.listForAuthenticatedUser();

      return (
        repos.data &&
        repos.data.map((r: listUserRepo["data"]) => ({
          name: r.name,
          url: r.html_url,
          owner: r.owner.login,
        }))
      );
    } catch (e) {
      console.log(e);
      throw new Error("Error fetching repos");
    }
  };

  getOpenIssues = async (name: string, owner: string): Promise<Issue[]> => {
    try {
      const issues: listIssuesResponse = await this.client.issues.list({
        name,
        owner,
      });
      return issues.data
        .filter((i) => i.state === "open")
        .map((i) => ({
          id: i.id,
          title: i.title,
          assigneeAvatar: i.assignee.avatar_url,
          assigneeName: i.assignee.login,
          created: i.created_at,
          lastUpdated: i.updated_at,
        }));
    } catch (e) {
      console.log(e);
      throw new Error("Error fetching issues");
    }
  };
}

export default Api;
