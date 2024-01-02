"use client";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";
import {
  httpGetFollowerUrl,
  httpGetOrganisationUrl,
  httpGetUserByLogin,
  httpGetUserRepo,
} from "@/app/service/requests";
import { IRepo, IUser, IUserOrg, IUserRepoDetail } from "@/utils/interface";
import { ArrowLeftIcon, UsersIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RepoItem from "@/components/RepoItem";
import { useErrorContext } from "@/context/ErrorContext";


const DetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const login = params.login;
  const [userData, setUserData] = useState<IUserRepoDetail>();
  const [userRepo, setUserRepo] = useState<IRepo[]>([]);
  const [filteredRepoData, setFilteredRepoData] = useState<IRepo[]>(userRepo);
  const [loading, setLoading] = useState(false);
  const [userOrgUrl, setUserOrgUrl] = useState<IUserOrg[]>([]);
  const [userFollowerUrl, setUserFollowerUrl] = useState<IUser[]>([]);
  const { setError } = useErrorContext();

  const getUserByLogin = async (login: string) => {
    try {
      setLoading(true);
      const user = await httpGetUserByLogin(login, setError);
      setUserData(user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getUserRepoUrl = async () => {
    try {
      setLoading(true);
      if (userData) {
        const repo = await httpGetUserRepo(userData.repos_url, setError);
        setUserRepo(repo);
        setFilteredRepoData(repo);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getUserOrganizationUrl = async () => {
    if (userData) {
      const orgUrl = await httpGetOrganisationUrl(
        userData.organizations_url,
        setError
      );
      setUserOrgUrl(orgUrl);
    }
  };

  const getUserFollowersUrl = async () => {
    if (userData) {
      const followersUrl = await httpGetFollowerUrl(
        userData.followers_url,
        setError
      );
      setUserFollowerUrl(followersUrl);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredRepoData(userRepo);
    } else {
      const filteredRepos =
        userRepo &&
        userRepo.filter((repo) => {
          return repo.name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase());
        });
      setFilteredRepoData(filteredRepos);
      return filteredRepos;
    }
  };

  useEffect(() => {
    getUserByLogin(login as string);
  }, []);

  useEffect(() => {
    getUserRepoUrl();
    getUserOrganizationUrl();
    getUserFollowersUrl();
  }, [userData]);

  return (
    <div className="space-y-2 xs:ps-2 px-4 md:px-24 min-h-screen">
      <div className="flex flex-col items-center md:items-start md:flex-row justify-center gap-4">
        {userData && (
          <div className="col-span-1 space-y-2 max-w-[20rem] flex flex-col items-center">
            <div
              className="flex justify-center items-center space-x-2 hover:shadow-md cursor-pointer py-3 "
              onClick={() => router.back()}
            >
              <ArrowLeftIcon width={25} className="" />
              <div>Back</div>
            </div>
            <div className="bg-purple-500 rounded-full w-56 h-56 flex items-center justify-center">
              <Image
                priority={true}
                className="bg-purple-500 rounded-full w-full h-full flex items-center justify-center"
                src={userData?.avatar_url!}
                alt="avater_url"
                width={100}
                height={0}
              />
            </div>
            <div className="space-y-2">
              <p className="capitalize font-medium text-lg text-center">
                {userData?.login}
              </p>
              <div className="px-2 text-sm">
                <div className="flex justify-center items-center gap-1">
                  <p>Followers </p>
                  <div className='flex justify-center items-center gap-2'>
                    <UsersIcon width={20} />
                    <div className="flex items-center justify-center">{userFollowerUrl.slice(0, 5).map(follower =>
                      <div
                        key={follower.id}
                        className='px-[0.9px] p-2 cursor-pointer'>
                        <Image
                          priority={true}
                          className='bg-purple-500 rounded-full w-full h-full flex items-center justify-center'
                          src={follower?.avatar_url!} alt="follower avater" width={20} height={0} />
                      </div>

                    )}
                    </div >
                  </div >
                </div >
                Total followers:{" "}
                <span className="font-semibold">{userData.followers}</span>
              </div>
              <div>{ }</div>
              <div className="flex flex-col space-x-1 border-t border-slate-400 ">
                <div className="text-left mt-3 font-medium text-sm">
                  Organization
                </div>
                <div className="flex space-x-1 mt-1">
                  {userOrgUrl.slice(0, 5).map((org) => {

                    return (
                      <div className="" key={org.id} >
                        <Image
                          priority={true}
                          src={org.avatar_url}
                          alt="organization avater"
                          width={10}
                          height={0}
                          className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center hover:opacity-75"
                        />{" "}

                      </div>

                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-4 w-full pt-5 md:pt-0">
          <div className="sm:flex justify-center md:justify-start" >
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className=" border-b border-slate-400"></div>
          {loading ? (
            <div className="flex justify-center items-center h-[75vh]">
              {" "}
              <Loader color="94A3B8" width={40} height={50} />
            </div>
          ) : (
            filteredRepoData.map((repo) => (
              <RepoItem repo={repo} key={repo.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
