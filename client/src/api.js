import axios from 'axios'

const url ='/api/client'

export default class API{
// get all clients
static async getAllClients(){
    const res = await axios.get(url);
    return res.data;
}

// get client by id
static async getClientById(id){
    const res = await axios.get(`${url}/${id}`);
    return res.data;
}

// create client
static async addClient(client){
    const res = await axios.post(url,client);
    return res.data;
}

// update client
static async updateClient(id, client){
    const res = await axios.patch(`${url}/${id}`,client);
    return res.data;
}

// delete client
static async deleteClient(id){
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
}
}