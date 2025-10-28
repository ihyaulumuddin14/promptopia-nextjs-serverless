'use client'

import Link from "next/link"

export default function Form({
   type,
   post,
   setPost,
   submitting,
   handleSubmit
}: {
   type: string
   post: {
      prompt: string
      tag: string
   }
   setPost: React.Dispatch<React.SetStateAction<{
      prompt: string
      tag: string
   }>>
   submitting: boolean
   handleSubmit: (e: React.FormEvent) => void
}) {
   return (
      <section className="w-full max-w-full flex-start flex-col">
         <h1 className="head_text text-left">
            <span className="blue_gradient">
               {type} Post
            </span>
         </h1>
         <p className="desc text-left max-w-md">
            {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
         </p>

         <form
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism mb-10">
               <label>
                  <span className="font-satoshi font-semibold text-base text-gray-700">
                     Your AI Prompt
                  </span>

                  <textarea
                     name="prompt"
                     value={post?.prompt}
                     onChange={(e) => setPost({
                        ...post,
                        prompt: e.target.value
                     })}
                     placeholder="Write your prompt here.."
                     required
                     className="form_textarea"
                  />
               </label>

               <label>
                  <span className="font-satoshi font-semibold text-base text-gray-700">
                     Tag {" "}
                     <span className="font-normal">(#webdevelopment #idea #product)</span>
                  </span>

                  <input
                     name="tag"
                     value={post?.tag}
                     onChange={(e) => setPost({
                        ...post,
                        tag: e.target.value
                     })}
                     placeholder="#tag"
                     required
                     className="form_input"
                  />
               </label>

               <div className="flex-end mx-3 mb-5 gap-4">
                  <Link href={"/"} className="text-gray-800 text-sm outline_btn">
                     Cancel
                  </Link>

                  <button
                     type="submit"
                     disabled={submitting}
                     className="px-5 py-1.5 text-sm black_btn"
                  >
                     {submitting ? `${type}...` : type}
                  </button>
               </div>
         </form>
      </section>
   )
}
