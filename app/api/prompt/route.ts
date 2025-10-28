import { connectToDB } from "@/utils/database"
import PromptModel from "@/models/prompt"

// get all prompts, idk why this action must be implemented ;c
export async function GET(request: Request) {
   try {
      await connectToDB();

      const prompts = await PromptModel.find({}).populate('creator');

      return new Response(JSON.stringify({
         message: "Prompts fetched successfully",
         data: prompts
      }), { status: 200 });
   } catch (error) {
      return new Response(JSON.stringify({
         message: "Failed to fetch prompts",
         error
      }), { status: 500 });
   }
}