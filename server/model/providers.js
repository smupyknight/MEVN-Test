const mongoose = require('mongoose');

const providersSchema = mongoose.Schema({
    id:{ 
        type: Number, 
        default: 0 
    },
    name:String,
    created:{
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Providers",providersSchema);