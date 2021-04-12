const express = require('express');
const router = express.Router();
const CLIENT_API = require("../controller/client-api")

router.get('/', CLIENT_API.getAllClient);
router.get('/:id', CLIENT_API.getClientByID);
router.post('/', CLIENT_API.createClient);
router.patch('/:id', CLIENT_API.updateClient);
router.delete('/:id', CLIENT_API.deleteClient);

module.exports =router;