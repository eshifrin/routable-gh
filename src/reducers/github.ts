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
}

let initialState: GithubState = {
  loginState: LoginState.NotLoggedIn,
  repos: [],
  issues: {},
  isLoading: false,
};

export const fetchRepos = createAsyncThunk(
  "users/getRepos",
  async (token: string) => {
    api = new Api(token);
    const repos = await api.getRepos();
    return repos;
  }
);

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
  },
});

export default githubSlice.reducer;
