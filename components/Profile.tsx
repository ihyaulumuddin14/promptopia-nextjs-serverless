import { Post } from "@/types/type"
import PromptCard from "./PromptCard"

export default function Profile({
   name,
   desc,
   data,
   handleEdit,
   handleDelete
}: {
   name: string,
   desc: string,
   data: Post[],
   handleEdit?: (post: Post) => void,
   handleDelete?: (post: Post) => void
}) {
   return (
      <section className="w-full">
         <h1 className="head_text text-left">
            <span className="blue_gradient">
               {name} Profile
            </span>
         </h1>

         <p className="desc text-left">
            {desc}
         </p>

         <div className='mt-10 prompt_layout'>
            {data && data.map(post => (
            <PromptCard 
               key={post._id}
               post={post}
               handleEdit={() => handleEdit && handleEdit(post)}
               handleDelete={() => handleDelete && handleDelete(post)}/>
            ))}
         </div>
      </section>
   )
}
