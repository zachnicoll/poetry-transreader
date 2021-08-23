import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import config from "./utils/config";

const app = express();
const logger = morgan("short");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(logger);

app.use(routes);

const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
