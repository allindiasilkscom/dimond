const mongoose =  require("mongoose");

const inquiry = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    number:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,

    },
    board:{
        type:String,
        require:true
    },
    standard:{
        type:String,
        require:true,
    },
    visitTime:{
        type:Date,
        require:false
    },
    emailSend:{
        type:Boolean,
        
    }

})

const Inquiry = mongoose.model("enquiry",inquiry);
module.exports = Inquiry;