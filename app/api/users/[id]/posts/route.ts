import PromptModel from "@/models/prompt";
import { connectToDB } from "@/utils/database";

// get prompts from a user by user id
export async function GET(request: Request, { params }: { params: { id: string } }) {
   try {
      await connectToDB();

      const prompts = await PromptModel.find({
         creator: params.id
      }).populate("creator");

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