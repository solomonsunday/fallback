import { IUser } from '@/utils/interface'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'


const UserCard = ({ user }: { user: IUser }) => {
    const router = useRouter()
    const { avatar_url, login, id, } = user

    return (
        <div
            data-testid={"user-card"}
            className='bg-slate-400 rounded-md p-5 h-[60px] flex items-center justify-around hover:shadow-md cursor-pointer'
            onClick={() => router.push(`/user/${login}`)}>
            <Image
                priority={true}
                className='bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center'
                src={avatar_url} alt="avater_url" width={100} height={0} />
            <div>{login}</div>
            <div>
                <ChevronRightIcon width={20} />
            </div>
        </div>

    )
}

export default UserCard