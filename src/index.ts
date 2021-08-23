import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
