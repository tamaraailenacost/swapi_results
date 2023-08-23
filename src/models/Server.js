const express = require('express');
const routerPlanets = require('../controllers/planetController');
const db_connect = require('../config/config-db');

// Sentry
const Sentry = require('@sentry/node');


class Server {


    constructor() {

        this.app = express();
        this.initSentry();
        this.port = process.env.PORT
        this.db()
        this.middleware()
        this.routes()
        this.connection()
        
    }

    initSentry = () => {

        Sentry.init({
            dsn: process.env.SENTRY_ID,
            maxBreadcrumbs: 50,
            debug: true,

            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({ tracing: true }),
                // enable Express.js middleware tracing
              ],

            // Seting Up Performance
            tracesSampleRate: 1.0,

          });
    }

    middleware = () =>{

        //Other middleware and routes
        this.app.use(Sentry.Handlers.errorHandler());
        this.app.use(Sentry.Handlers.tracingHandler());
        this.app.use(Sentry.Handlers.requestHandler());

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