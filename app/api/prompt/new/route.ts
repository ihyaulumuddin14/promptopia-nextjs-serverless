import { connectToDB } from "@/utils/database";
import PromptModel from "@/models/prompt";

export async function POST(request: Request) {
   const { userId, prompt, tag } = await request.json();

   try {
      await connectToDB();

      const newPrompt = new PromptModel({
         creator: userId,
         prompt,
         tag
      });

      newPrompt.save();

      return new Response(
         JSON.stringify({
            message: "Prompt created successfully",
            data: newPrompt
         }), {
            status: 201
         }
      )
   } catch (error) {
      return new Response(
         JSON.stringify({
            message: "Failed to create prompt",
            error
         }), {
            status: 500
         }
      )
   }
}