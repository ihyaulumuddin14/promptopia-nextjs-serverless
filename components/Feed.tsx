'use client'

import { useState, useEffect } from 'react'
import type { Post } from '@/types/type'
import PromptCard from './PromptCard';

export default function Feed() {
   const [searchText, setSearchText] = useState('');
   const [posts, setPosts] = useState<Post[]>([]);

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
   }

   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch('/api/prompt');
         const data = await response.json();

         setPosts(data.data);
      }

      fetchPosts();
   }, [])

   return (
      <section className='feed'>
         <form className='relative w-full flex-center'>
            <input
               type="text"
               placeholder='Search for a tag or a username'
               value={searchText}
               onChange={handleSearchChange}
               required
               className='search_input peer'/>
         </form>

         <PromptCardList 
            data={posts}
            handleTagClick={() => {}}
         />
      </section>
   )
}


const PromptCardList = ({ data, handleTagClick }: { data: Post[], handleTagClick: (tag: string) => void }) => {
   return (
      <div className='mt-16 prompt_layout'>
          {data && data.map((post, index) => (
            <PromptCard 
               key={index}
               post={post}
               handleTagClick={handleTagClick}/>
          ))}
      </div>
   )
}

