import { Router } from "express";
import { createAuthorsCollection } from "./author.service.js";


const authorRouter=Router()
authorRouter.post("/createAuthorsCollection",createAuthorsCollection)


export default authorRouter;