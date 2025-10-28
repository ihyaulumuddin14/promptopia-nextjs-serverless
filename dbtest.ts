import { connectToDB } from "./utils/database.js";

(async () => {
   await connectToDB();
   console.log("Database connected!");
})();
