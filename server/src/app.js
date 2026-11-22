import express from "express";
import leadRouter from "./routes/lead.routes.js";
import cors from "cors";

const app = express();

// For parse Json object into JS
app.use(express.json());

const allowedOrigins = process.env.ORIGIN_ALLOW.split(",").map((origin) =>
  origin.trim(),
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin (Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "server health is good",
  });
});

app.use("/api/leads", leadRouter);

export default app;
