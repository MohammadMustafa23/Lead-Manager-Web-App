import dotenv from "dotenv";
dotenv.configDotenv();
import { connectDB } from "./config/db.js";
import app from "./src/app.js";

const PORT = process.env.PORT;


// Server startup
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server Startup Failed:", error.message);
    process.exit(1);
  }
};

startServer();
