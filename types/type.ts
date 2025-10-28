export type User = {
   _id: string;
   email: string;
   username: string;
   image: string
}

export type Post = {
   _id: string;
   prompt: string;
   tag: string;
   creator: User
}