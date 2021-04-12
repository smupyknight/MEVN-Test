const clientsModel = require("../model/clients");
const providersModel = require("../model/providers");
module.exports = class CLientApi {

    //Get All Client
static async getAllClient(req, res){
    try{
        const clients = await clientsModel.find().populate('providers');
        const providers = await providersModel.find();
        res.status(200).json({"clients":clients,
        "providers":providers
    });
    }catch(ex){
        res.status(500).json({message:ex.message});

    }
}

//Get specfic client
static async getClientByID(req,res){
    const id =req.params.id;
    try {
        const client = await clientsModel.findById(id);
        res.status(200).json(client);
    } catch (ex) {
        res.status(500).json({message:ex.message});
    }
}

//Create client
static async createClient(req,res){
   const client = req.body;
   console.log(client);
   try {
       await clientsModel.create(client);
       res.status(201).json({message: 'Client created successfully!'})
   } catch (ex) {
       res.status(500).json({message:ex.message})
       
   }
}


//Update Client
static async updateClient(req,res){
    const id =req.params.id;
    const client  = req.body
    try {
        await clientsModel.findByIdAndUpdate(id,client);
       res.status(200).json({message: 'Client updated successfully!'})

        
    } catch (ex) {
        res.status(500).json({message:ex.message});
    }
}

//Delete client
static async deleteClient(req,res){
    const id =req.params.id;
    try {
        const del = await clientsModel.findByIdAndRemove(req.params.id);
        res.status(200).json({message: 'Client deleted successfully!'})
    } catch (ex) {
        res.status(500).json({message:ex.message});
    }
}

}