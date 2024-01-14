import { ErrorResponse } from "@/utils/interface";
import { FetchError } from "node-fetch";

const API_URL = "https://api.github.com";
const httpHeaders = {
  method: "GET",
  // headers: {
  //   Authorization: "Bearer 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",
  //   "X-GitHub-Api-Version": "2022-11-28",
  // },
};

async function handleErrors(res: Response) {
  if (!res.ok) {
    const error = await res.json();
    const errorRes: ErrorResponse = {
      message: error.message,
      status: res.status,
      url: res.url,
    };
    throw errorRes;
  }
  return res;
}

async function httpGetGithubUsers(setError: (error: ErrorResponse) => void) {
  try {
    const res = await fetch(`${API_URL}/users`, httpHeaders);
    await handleErrors(res);
    return await res.json();
  } catch (error) {
    setError(error as ErrorResponse);
  }
}

async function httpGetUserRepo(
  repo_url: string,
  setError: (error: ErrorResponse) => void
) {
  try {
    const res = await fetch(repo_url, httpHeaders);
    await handleErrors(res);
    return await res.json();
  } catch (error) {
    setError(error as ErrorResponse);
  }
}

async function httpGetOrganisationUrl(
  organizations_url: string,
  setError: (error: ErrorResponse) => void
) {
  try {
    const res = await fetch(organizations_url, httpHeaders);
    await handleErrors(res);
    return await res.json();
  } catch (error) {
    setError(error as ErrorResponse);
  }
}

async function httpGetUserByLogin(
  login: string,
  setError: (error: ErrorResponse) => void
) {
  try {
    const res = await fetch(`${API_URL}/users/${login}`, httpHeaders);
    await handleErrors(res);
    return await res.json();
  } catch (error) {
    setError(error as ErrorResponse);
  }
}

async function httpGetFollowerUrl(
  following_url: string,
  setError: (error: ErrorResponse) => void
) {
  try {
    const res = await fetch(following_url, httpHeaders);
    await handleErrors(res);
    return await res.json();
  } catch (error) {
    setError(error as ErrorResponse);
  }
}

export {
  httpGetGithubUsers,
  httpGetUserRepo,
  httpGetOrganisationUrl,
  httpGetUserByLogin,
  httpGetFollowerUrl,
};
