import { db } from "../connectionDB.js";

const bookModel = await db.createCollection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
      },
    },
  },
});
export default bookModel;
