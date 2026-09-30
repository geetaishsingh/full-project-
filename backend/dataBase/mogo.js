import mongoose from "mongoose";

const dataBase = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    
  } catch (error) {
    console.log(error);
  }
};

export default dataBase;
