'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

import Form from '@/components/Form';

export default function CreatePrompt() {
   const router = useRouter();
   const { data: session } = useSession();
   const [submitting, setSubmitting] = useState(false);
   const [post, setPost] = useState({
      prompt: '',
      tag: ''
   });

   const createPrompt = async(e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      if (!session?.user?.id) return;

      try {
         const response = await fetch('/api/prompt/new', {
            method: 'POST',
            body: JSON.stringify({
               prompt: post.prompt,
               tag: post.tag,
               userId: session?.user?.id
            })
         })
         const body = await response.json();
   
         if (response.ok) {
            alert(body.message);
            console.log(body.data)
            router.push('/');
         } else {
            alert(body.message);
         }
      } catch (error) {
         console.log(error);
      } finally {
         setSubmitting(false);
      }
   }

   return (
      <Form
         type="Create"
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={createPrompt}
      />
   )
}
