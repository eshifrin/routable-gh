import { createSlice, combineReducers } from "@reduxjs/toolkit";
import Api, { Repo, Issue } from "../api/index";
let api: typeof Api;

enum LoginState {
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
  loginState: LoginState;
  repos: Repo[];
  issues: Issues;
}

let initialState: GithubState = {
  loginState: LoginState.NotLoggedIn,
  repos: [],
  issues: {},
};

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {},
});

export default githubSlice.reducer;
