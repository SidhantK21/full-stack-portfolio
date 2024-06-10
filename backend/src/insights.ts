import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import FormModel from './db';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend URL if needed
}));


app.post("/sendDet", async (req: any, res: any) => {

    const { userName, emailAddress, details } = req.body;
    try
    {
        // if the userName is there in the database then the database will not save the data 
        const existsUser=await FormModel.findOne({userName});
        if(existsUser)
        {
            res.json({msg:"A project request is alreday been made !"})
       
        }
        else{
    
        const newForm = new FormModel({
            userName,
            emailAddress,
            details
        });
    
         await newForm.save();
            res.json({
                msg: "Successfully submitted"
            });
        }
        
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Error submitting!"
        });
    }
});

const port = process.env.portNumber;
app.listen(port, () => {
    console.log("Running on the server");
});
