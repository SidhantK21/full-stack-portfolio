import dotenv from 'dotenv';
import mongoose, { Document, Schema } from 'mongoose';

dotenv.config();

export interface Form extends Document {
  userName: string;
  emailAddress: string;
  details: string;
}

const FormSchema: Schema = new Schema({
  userName: { type: String,required:true},
  emailAddress: { type: String,required:true},
  details: { type: String,required:true},
});

const FormModel = mongoose.model<Form>('Form', FormSchema);

const connectToDatabase = async () => {
  try {
    const url = process.env.dburl;
    if (!url) {
      throw new Error("Database URL not defined in environment variables");
    }
    await mongoose.connect(url);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

connectToDatabase();

export default FormModel;
