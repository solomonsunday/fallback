"use client";
import { IUser } from "@/utils/interface";
import { useCallback, useEffect, useState } from "react";
import { httpGetGithubUsers } from "../app/service/requests";
import { useErrorContext } from "@/context/ErrorContext";

export const useGithubUsers = () => {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { setError } = useErrorContext();

  const getGitHubUsers = useCallback(async () => {
    try {
      setLoading(true);
      const fetchUsers = await httpGetGithubUsers(setError);
      setUsersData(fetchUsers);
    } catch (error) {
      //@ts-ignore
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getGitHubUsers();
  }, [getGitHubUsers]);

  return { usersData, loading };
};
