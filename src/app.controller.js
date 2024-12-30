import { checkDBconnection } from "./DB/connectionDB.js";
import authorRouter from "./modules/author/author.controller.js";
import bookRouter from "./modules/book/book.controller.js";
import logsRouter from "./modules/logs/logs.controller.js";

const bootstrap = async (app, express) => {
  await checkDBconnection();
  app.use(express.json());
  
  app.use("/author",authorRouter)
  app.use("/logs",logsRouter)
  app.use("/book",bookRouter)
  app.use("*", (req, res, next) => {
    res
      .status(404)
      .send({ error: "Not found", message: `invalid url ${req.originalUrl}` });
  });
};
export default bootstrap;
