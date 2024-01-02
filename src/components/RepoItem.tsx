import { IRepo } from '@/utils/interface'
import dayjs from 'dayjs'
import React from 'react'

interface IRepoItem {
    repo: IRepo
}

const RepoItem = (props: IRepoItem) => {
    const { repo } = props

    return (
        <div className='col-span-3 border-b border-slate-400 p-3 grid grid-cols-4'>
            <div className='col-span-3 flex flex-col'>
                <div className=' cursor-pointer flex gap-3 items-center'>
                    <div className='text-blue-500 text-lg font-semibold'>
                        {repo.name}</div>
                    <span className=' border border-slate-400 rounded-full text-sm px-3 capitalize'>
                        {repo.visibility}</span>
                </div>
                {
                    repo.forks_url && <div className='text-xs'>Forked from <span className='underline'>{repo.forks_url}</span></div>
                }
                <div className='font-sans max-w-3xl pb-3'>
                    {repo.description}
                </div>

                <div className=' cursor-pointer flex gap-3 items-center text-xs'>
                    <div className='flex items-center justify-center'>
                        <div className='rounded-full h-3 w-3 bg-yellow-500 '></div>
                        <div className='pl-1'> {repo.language}</div>
                    </div>
                    <div className=''>
                        Updated on {dayjs(repo.updated_at).format('MMM D')}</div>
                </div>
            </div>

            <div className='font-sans text-right'>
                testing
            </div>
        </div>

    )
}

export default RepoItem