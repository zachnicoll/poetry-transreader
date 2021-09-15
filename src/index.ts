import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";

const app = express();
const logger = morgan("combined");

const corsOptions = {
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(logger);

app.use(routes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
