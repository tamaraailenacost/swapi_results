const { Router } = require('express');
const routerPlanets = Router();
const { paginateSwapi } = require('../models/swapi-service');


// send something like http://localhost:3333/api/planets?page=2&limit=3 to get paginated results

routerPlanets.get('/', async(req, res) => {
    try {
        const page  = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        
        const responseSwapi = await paginateSwapi( page, limit)
        res.status(200).json(responseSwapi);

    } catch (err) {
        console.error(`Error occurred while fetching planets: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = routerPlanets;
