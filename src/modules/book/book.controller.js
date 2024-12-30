import { Router } from "express";
import {
  addBook,
  addBooks,
  createBooksIndex,
  deleteBooksBefore2000,
  filterBooksAfter2000Fields,
  filterBooksAfter2000Sorted,
  findBookByTitle,
  findBooksByGenre,
  findBooksByYearRange,
  findBooksByYearType,
  findBooksExcludingGenres,
  findBooksPaginated,
  joinBooksAndLogs,
  unwindGenres,
  updateBook,
} from "./book.service.js";

const bookRouter = Router();

bookRouter.get("/createBooksIndex", createBooksIndex);
bookRouter.post("/addBook", addBook);
bookRouter.post("/addBooks", addBooks);
bookRouter.put("/updateBook", updateBook);
bookRouter.get("/findBookByTitle", findBookByTitle);
bookRouter.get("/findBooksByYearRange", findBooksByYearRange);
bookRouter.get("/findBooksByGenre", findBooksByGenre);
bookRouter.get("/findBooksPaginated", findBooksPaginated);
bookRouter.get("/findBooksByYearType", findBooksByYearType);
bookRouter.get("/findBooksExcludingGenres", findBooksExcludingGenres);
bookRouter.delete("/deleteBooksBefore2000", deleteBooksBefore2000);
bookRouter.get("/filterBooksAfter2000Sorted", filterBooksAfter2000Sorted);
bookRouter.get("/filterBooksAfter2000Fields", filterBooksAfter2000Fields);
bookRouter.get("/unwindGenres", unwindGenres);
bookRouter.get("/joinBooksAndLogs", joinBooksAndLogs);


export default bookRouter;
