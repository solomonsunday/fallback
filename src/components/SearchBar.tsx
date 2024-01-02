import { IKeywords } from '@/utils/interface';
import React, { ChangeEvent, useState } from 'react';

const SearchBar = ({ onSearch }: IKeywords) => {
    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value
        setSearchQuery(newQuery);
        onSearch(newQuery)
    }

    return (
        <>
            <div className='border-slate-600 border rounded-md md:w-96 ml-2 w-full'>
                <input
                    type='text'
                    value={searchQuery}
                    className='text-xs px-2 focus:outline-none md:w-96 bg-transparent py-1  placeholder:px-1 placeholder:text-xs'
                    placeholder={'Find a repository'}
                    key="search-bar"
                    onChange={handleInputChange}
                />
            </div>
        </>
    )
}

export default SearchBar