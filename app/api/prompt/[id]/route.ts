import { connectToDB } from "@/utils/database";
import PromptModel from "@/models/prompt";

// GET (read)
export async function GET ( request: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      await connectToDB();

      const id = (await params).id;
      const prompt = await PromptModel.findById(id);

      if (!prompt) return new Response(JSON.stringify({
         message: "Prompt not found",
         data: null
      }), { status: 404 });

      return new Response(JSON.stringify({
         message: "Prompt fetched successfully",
         data: prompt
      }), { status: 200 });
   } catch (error) {
      return new Response(JSON.stringify({
         message: "Failed to fetch prompt",
         error
      }), { status: 500 });
   }
}

// PATCH (update)
export async function PATCH (request: Request, { params }: { params: Promise<{ id: string }> }) {
   const { prompt, tag } = await request.json();

   try {
      const id = (await params).id;
      const promptUpdated = await PromptModel.findByIdAndUpdate(id, {
         prompt,
         tag
      })
   
      if (!promptUpdated) return new Response(JSON.stringify({
         message: "Prompt not found",
         data: null
      }), { status: 404 });
   
      return new Response(JSON.stringify({
         message: "Prompt updated successfully",
         data: promptUpdated
      }), { status: 200 });
   } catch (error) {
      return new Response(JSON.stringify({
         message: "Failed to update prompt",
         error
      }), { status: 500 });
   }
}

// DELETE (delete)
export async function DELETE (request: Request, { params }: { params:Promise<{ id: string }> }) {
   try {
      const id = (await params).id
      const promptDeleted = await PromptModel.findByIdAndDelete(id);
   
      if (!promptDeleted) return new Response(JSON.stringify({
         message: "Prompt not found",
         data: null
      }), { status: 404 });
   
      return new Response(JSON.stringify({
         message: "Prompt deleted successfully",
         data: promptDeleted
      }), { status: 200 });
   } catch (error) {
      return new Response(JSON.stringify({
         message: "Failed to delete prompt",
         error
      }), { status: 500 });
   }
}