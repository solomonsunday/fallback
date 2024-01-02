"use client";
import Loader from "@/components/Loader";
import UserCard from "@/components/UserCard";
import { useGithubUsers } from '../hooks/useGithubUsers'

export default function Home() {
  const { usersData, loading } = useGithubUsers();

  return (
    <div className="min-h-screen mx-7 xs:ps-2 px-4 md:px-24 ">
      <>
        {loading ? (
          <div className="flex justify-center items-center h-[75vh]">
            {" "}
            <Loader color="94A3B8" width={40} height={50} />
          </div>
        ) : (
          <div className="space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {usersData.length > 0 &&
              usersData.map((user) => <UserCard user={user} key={user.id} />)}
          </div>
        )}
        {!loading && usersData.length === 0 && <div className="flex justify-center items-center">No User found!</div>}
      </>
    </div>
  );
}
