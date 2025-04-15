import express, { Express } from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import connectDB from "./config/connect";
import routes from "./routes";
import cookieParser from "cookie-parser";

const app: Express = express();
const server = http.createServer(app); // ✅ eksik olan tanım

connectDB();

// app.use(rateLimit(...)) // varsa devre dışı

app.use(cookieParser());

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ Not allowed by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json({ strict: false }));

app.use("/uploads", express.static("uploads"));
app.use("/api", routes);

const port = process.env.PORT || 5015;
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

