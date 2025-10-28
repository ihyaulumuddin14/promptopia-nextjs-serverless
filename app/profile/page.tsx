'use client'

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { Post } from "@/types/type"
import Profile from "@/components/Profile"

export default function MyProfile() {
   const router = useRouter();
   const { data: session, status } = useSession();
   const [posts, setPosts] = useState<Post[]>([]);

   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch(`/api/users/${session?.user.id}/posts`);
         const data = await response.json();

         if (response.ok) {
            setPosts(data.data);
         } else {
            console.log(data.error);
         }
      }
      
      if (status === "authenticated") fetchPosts();
   }, [session]) // for rerender this component when session status has changed from loading to authenticated

   const handleEdit = (post: Post) => {
      router.push(`/update-prompt?id=${post._id}`);
   }

   const handleDelete = async (post: Post) => {
      try {
         const response = await fetch(`/api/prompt/${post._id}`, {
            method: 'DELETE'
         });
         const body = await response.json();

         if (!response.ok) {
            alert(body.message);
         } else {
            alert(body.message);
            window.location.reload();                     
         }
      } catch (error) {
         console.log(error);
      }
   }

   if (status !== "authenticated") return <div>{status}</div>

   return (
      <Profile
         name="My"
         desc="Welcome to your personalized profile page"
         data={posts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
      />
   )
}
