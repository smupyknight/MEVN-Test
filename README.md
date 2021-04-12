# MEVN Full Stack
## Setup

Open mevn_project folder in VS Code and open terminal.
Split terminal into two, in one terminal change directory to client and in other change directory to server.

In both the terminal run
```sh
npm i
```

## Running Server
Open ./server/.env file and provide mongoDB connection string value in DB_URI
```sh
DB_URI = mongodb+srv://<USERNAME>:<PASSWORD>@<SERVER>/<CLUSTER>?retryWrites=true&w=majority
```
To Run API execute below command in Server terminal
```sh
npm run dev
```
This will run the server on port 5000, open http://localhost:5000/api-docs/
## Running Client
Go to /client/vue.config.js and makesure you have correct API path defined for target value 
For localhost target: 'http://localhost:5000'

To Run Client UI execute below command in Client terminal
```sh
npm run serve
```

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## mongoDB Setup
To use mongoDB, create account on https://www.mongodb.com/cloud/atlas, here you can get 500 MB of free storage to test and run application.

To install on local machine follow guide on https://docs.mongodb.com/manual/administration/install-on-linux/ 

## License

MIT

**Free to use**

