const express = require('express');
const routerPlanets = require('../controllers/planetController');
const db_connect = require('../config/config-db');

class Server {


    constructor() {

        this.app = express();
        this.port = process.env.PORT
        this.db()
        this.middleware()
        this.routes()
        this.connection()
        
    }

    middleware = () =>{

        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes = () => {
        this.app.use('/api/planets', routerPlanets);
    }


    db = () => {
         db_connect()
    }


    connection = () =>{
        this.app.listen(this.port, () => {
            console.log("The server is running!,", this.port);
          })
    }

}

module.exports = Server;