// Sentry
const Sentry = require('@sentry/node');

const { Router } = require('express');
const routerPlanets = Router();
const { paginateSwapi } = require('../models/swapi-service');



// send something like http://localhost:3333/api/planets?page=2&limit=3 to get paginated results

routerPlanets.get('/', async(req, res) => {
    try {

        //start transation
        const transaction = Sentry.startTransaction({
            op: 'express.request',
            name: 'Get Planets',
          });

        const page  = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        
        const responseSwapi = await paginateSwapi( page, limit)
        
        // End the transaction when the request is completed
        transaction.finish();

        res.status(200).json(responseSwapi);


    } catch (err) {
        Sentry.captureException(err);
        console.error(`Error occurred while fetching planets: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// trying Sentry
routerPlanets.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

module.exports = routerPlanets;
