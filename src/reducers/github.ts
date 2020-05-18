import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Api, { Repo, Issue } from "../api/index";
let api: Api;

export enum LoginState {
  LoggedIn = "LoggedIn",
  NotLoggedIn = "NotLoggedIn",
  LoggedInError = "LoggedInError",
}

type Issues = {
  [repoName: string]: {
    [issueId: number]: Issue;
    issueOrder: string[];
  };
};

interface GithubState {
  isLoading: boolean;
  loginState: LoginState;
  repos: Repo[];
  issues: Issues;
  issueError: boolean;
  repoSelected: string;
}

let initialState: GithubState = {
  loginState: LoginState.NotLoggedIn,
  repos: [],
  issues: {},
  isLoading: false,
  issueError: false,
  repoSelected: "",
};

export const fetchRepos = createAsyncThunk(
  "users/getRepos",
  async (token: string) => {
    api = new Api(token);
    const repos = await api.getRepos();
    return repos;
  }
);

export const fetchIssues = createAsyncThunk(
  "users/getIssues",
  async (args: { name: string; owner: string; fullName: string }) => {
    const { name, owner, fullName } = args;
    const issues = await api.getOpenIssues(name, owner);
    return { issues, name, owner, fullName };
  }
);

/*
  TODO: compare to existing issues
  deal with sorting
 */

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepos.pending, (state: GithubState) => {
      state.isLoading = true;
    });

    builder.addCase(fetchRepos.fulfilled, (state: GithubState, action) => {
      state.repos = action.payload;
      state.isLoading = false;
      state.loginState = LoginState.LoggedIn;
    });

    builder.addCase(fetchRepos.rejected, (state: GithubState, action) => {
      state.isLoading = false;
      state.loginState = LoginState.LoggedInError;
    });

    builder.addCase(fetchIssues.pending, (state: GithubState, action) => {
      state.isLoading = true;
      state.repoSelected = action.meta.arg.fullName;
    });

    builder.addCase(fetchIssues.fulfilled, (state: GithubState, action) => {
      const { issues, name, owner, fullName } = action.payload;

      const repoIssues: any = {};
      issues.forEach((issue) => {
        repoIssues[issue.id] = issue;
      });

      repoIssues.issueOrder = issues.map((issue) => issue.id);

      state.issues[fullName] = repoIssues;
      state.isLoading = false;
    });

    builder.addCase(fetchIssues.rejected, (state: GithubState, action) => {
      state.isLoading = false;
      state.issueError = true;
    });
  },
});

export default githubSlice.reducer;
