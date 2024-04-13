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
const addmission = require("./models/addmission");

app.post("/enquiry",async(req,res)=>{
    try {
        const {name,number,email,board,standard,visitTime}=req.body;
        const inquiry = new Inquiry({
            name,
            number,
            email,
            board,
            standard,visitTime
        })

        await inquiry.save();
        res.status(202).json({
            message:"Enquiry Added"
        })
        
    } catch (error) {
        console.log("Error In Enquiry",error);
        res.status(500).json({message:"enquiry Failed"})
        
    }
})

app.get("/enquiries", async (req, res) => {
    try {
        const inquiries = await Inquiry.find(); // Retrieve all inquiries from the database
        res.status(200).json(inquiries);
    } catch (error) {
        console.log("Error retrieving inquiries", error);
        res.status(500).json({ message: "Failed to retrieve inquiries" });
    }
});

app.post("/addmission", async (req, res) => {
    try {
        const { firstName, middleName, lastName, dob, gender, course, address, email, phoneNo, subject, fee } = req.body;

        const newAdmission = new addmission({
            firstName,
            middleName,
            lastName,
            dob: new Date(dob),
            gender,
            course,
            address,
            email,
            phoneNo,
            subject,
            fee
        });

        // Save the new admission record to the database
        await newAdmission.save();

        res.status(201).json({
            message: "Admission Added",
            admission: newAdmission
        });
    } catch (error) {
        console.error("Error in adding admission:", error);

        // Return detailed error response with error message
        res.status(500).json({ message: "Failed to add admission", error: error.message });
    }
});
app.get("/admissions", async (req, res) => {
    try {
        const admissions = await addmission.find(); // Retrieve all admissions from the database
        res.status(200).json(admissions); // Respond with the list of admissions as JSON
    } catch (error) {
        console.error("Error in retrieving admissions:", error);
        res.status(500).json({ message: "Failed to retrieve admissions" });
    }
});


app.get("/admissions/:id", async (req, res) => {
    const admissionId = req.params.id;

    try {
        const admission = await addmission.findById(admissionId); // Find admission by ID in the database

        if (!admission) {
            return res.status(404).json({ message: "Admission not found" });
        }

        res.status(200).json(admission); // Respond with the admission details as JSON
    } catch (error) {
        console.error("Error in retrieving admission:", error);
        res.status(500).json({ message: "Failed to retrieve admission" });
    }
});
