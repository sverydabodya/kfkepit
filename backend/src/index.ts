import "dotenv/config";
import morgan from "morgan";
import express from "express";
import expressSession from "express-session";
import cors from "cors";
import helmet from "helmet";
import mainRouter from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
import { sesssionConfig } from "./config/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(expressSession(sesssionConfig));

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true,
}));
//helmet needs configuration and maybe useless
app.use(helmet());
//todo add rate limiter, cache
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", mainRouter);

app.use(errorHandler);

app.listen(port, () => {
	console.log("Server started on http://localhost:" + port);
});

export default app;
