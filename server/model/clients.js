const mongoose = require('mongoose');


const clientSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    //providers:[{id:Number}],
    providers:[{type: mongoose.Schema.Types.ObjectId, ref: 'Providers'}],
    created:{
        type: Date,
        default:Date.now
    },
    updated:Date,
    
});

module.exports = mongoose.model("Clients",clientSchema);