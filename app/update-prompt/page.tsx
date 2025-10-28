'use client'

import Form from "@/components/Form";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function UpdatePrompt() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const promptId = searchParams.get("id");
   const { data: session } = useSession();
   const [post, setPost] = useState({
      prompt: '',
      tag: '' 
   });
   const [submitting, setSubmitting] = useState(false);

   useEffect(() => {
      const fetchDataPrompt = async () => {
         try {
            const response = await fetch(`/api/prompt/${promptId}`);
            const body = await response.json();

            if (!response.ok) {
               alert(body.message);
               router.replace('/profile');
            } else {
               setPost(body.data);
            }
         } catch (error) {
            console.log(error);
         }
      }

      if (!session?.user?.id) return;

      fetchDataPrompt();
   }, [session])

   const editPrompt = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      if (!session?.user?.id) return;

      try {
         const response = await fetch(`/api/prompt/${promptId}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               prompt: post.prompt,
               tag: post.tag
            })
         });
         const body = await response.json();

         if (!response.ok) {
            alert(body.message);
         } else {
            alert(body.message);
            console.log(body.data);
            router.push('/profile');
         }
      } catch (error) {
         console.log(error);
      } finally {
         setSubmitting(false);
      }
   }

   return (
      <Form
         type="Edit Prompt"
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={editPrompt}
      />
   )
}
