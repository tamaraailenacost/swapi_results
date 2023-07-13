const axios      =  require('axios');
const Planet     =  require('./planetsModel')

const fetchSwapi = async() => {

    try {
        
        const response = await axios.get('https://swapi.dev/api/planets');
        const planets = response.data.results;
        return planets;

    } catch (error) {
        console.error('Error fetching data from the API:', error);
        throw new Error('Failed to fetch data from the API');
      }

}

const saveSwapi = async() => {

    try {
        const dataFetched = await fetchSwapi();
        const planetsToSave = dataFetched.map((planet) => ({
            name: planet.name,
            climate: planet.climate,
            terrain: planet.terrain,
            population: planet.population,
          }));
      
          await Planet.insertMany(planetsToSave);
      
        console.log("sucessfuly saved planets");
  
    } catch (error) {
        console.error('Error to save data:', error);
        throw new Error('Failed to save data from the API');
    }
    
}

 const paginateSwapi = async( page , limit) => {

    const skip = page * limit;
    try {
        const count = await Planet.countDocuments();
        const totalPages = Math.ceil(count / limit);
        return await Planet.find().skip(skip).limit(limit);

    } catch (error) {
            console.error('Error to retrieve data:', error);
            throw new Error('Failed to retrieve and paginate data from the API');
    }
   
}

saveSwapi()
module.exports = { fetchSwapi, saveSwapi, paginateSwapi }
