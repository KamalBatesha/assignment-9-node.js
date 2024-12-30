import { ObjectId } from "mongodb";
import { db } from "../../DB/connectionDB.js";

export const createLogsCollection = async (req, res) => {
  try {
     await db.createCollection("logs", {
      capped: true,
      size: 1000000,
    });
    res
      .status(200)
      .json({ message: "Logs collection created"});
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Error creating logs collection",error });
  }
};

export const addLog = async (req, res) => {
  const { book_id,action } = req.body;
  try {
      const logData=await db.collection('logs').insertOne({ book_id:new ObjectId(book_id),action, timestamp: new Date() })
      res.status(201).json({ message: "Log added successfully", logData });
          
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding log", error });
  }
};
