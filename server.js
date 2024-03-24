const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');

const app= express();
const port =5000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://ais:Mumbai%402050@ais.wxrnb0k.mongodb.net/diamonclass",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Db Connected")
}).catch((err)=>{
    console.log("error",err)
});

app.listen(port,()=>{
    console.log("server is started")
})

const Inquiry = require("./models/enquiry");

app.post("/enquiry", async (req, res) => {
    try {
        const { name, number, email, board, standard, visitTime } = req.body;
        
        // Delete all existing records
        await Inquiry.deleteMany({});
        
        // Create a new inquiry record
        const inquiry = new Inquiry({
            name,
            number,
            email,
            board,
            standard,
            visitTime
        });

        // Save the new inquiry record
        await inquiry.save();

        res.status(202).json({
            message: "Enquiry Added"
        });

    } catch (error) {
        console.log("Error In Enquiry", error);
        res.status(500).json({ message: "enquiry Failed" });
    }
});

app.get("/enquiries", async (req, res) => {
    try {
        const inquiries = await Inquiry.find(); // Retrieve all inquiries from the database
        res.status(200).json(inquiries);
    } catch (error) {
        console.log("Error retrieving inquiries", error);
        res.status(500).json({ message: "Failed to retrieve inquiries" });
    }
});
