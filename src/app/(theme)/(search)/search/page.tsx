import React from 'react'
import { GoSearch } from 'react-icons/go'

const SearchFoodPage = () => {
   return (
      <div className='theme-container'>
         <div className="h-screen py-10">
            <div className="w-8/12 flex items-center border border-slate-400 rounded p-0.5 mx-auto">
               <input type="text" placeholder='Search foods....' className='w-full h-9 text-base text-black border-0 focus:outline-none p-2' />
               <button type="button" className='p-2'><GoSearch size={25} /></button>
            </div>
         </div>
      </div>
   )
}

export default SearchFoodPage