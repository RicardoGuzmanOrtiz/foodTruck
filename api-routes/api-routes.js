const express = require('express');
const router = express.Router();

const { getCollection, ObjectId } = require('../todo-db')


// GET /api/events
router.get('/', async(_, response) => {
    const collection = await getCollection('FoodTruck-API', 'Events')
    const events = await collection.find({}).toArray()
    // Map to rename _id to id to use it on the put 
    const updatedId = events.map(todo => {
        const { _id, ...rest } = todo
        return { id: _id, ...rest }
    });

    response.json(updatedId);
});




// POST /api/todos

router.post('/', async (request, response) => {
    // this maps to POST /api/todos
    const collection = await getCollection('FoodTruck-API', 'Events')
 const {name,location,dates,hours} = request.body
    const result = await collection.insertOne({ name, location, dates, hours}) 
	response.json(result)
})

// PUT /api/todos/:id
router.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { name, location, dates, hours } = request.body;
    const collection = await getCollection('FoodTruck-API', 'Events')
   
    const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, location, dates, hours } }
        );
   
    response.json(result); 
}); 

// GET /api/events/:id
router.get('/:id', async (request, response) => {
    
        const id = request.params.id
        const collection = await getCollection('FoodTruck-API', 'Events')
        
        const event = await collection.findOne({ _id: new ObjectId(id) })
        response.json(event);
    
    
});




// DELETE /api/events/:id
router.delete('/:id', async (request, response) => {
        const id = request.params.id
        const collection = await getCollection('FoodTruck-API', 'Events')
        const result = await collection.deleteOne({ _id: new ObjectId(id) })

});

module.exports = router
