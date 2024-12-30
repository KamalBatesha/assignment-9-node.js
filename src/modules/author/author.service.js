import { db } from "../../DB/connectionDB.js";

export const createAuthorsCollection = async (req, res, next) => {
  const { name, nationality } = req.body;

  try {
    let author = await db.collection("authors").insertOne({
      name,
      nationality,
    });

    return res.status(200).json({
      message: "Authors collection created and one author inserted",
      authorData: author,
    });
  } catch (err) {
    console.log(err);
    
    res.status(500).json(err);
  }
};
