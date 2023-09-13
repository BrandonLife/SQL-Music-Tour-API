const events = require('express').Router()
const db = require('../models')

const {Event, Stage, Band} = db

const {Op} = require('sequelize')

   
// FIND ALL events
events.get('/', async (req, res) => {
  try {
      const foundEvents = await Event.findAll({
          order: [ [ 'date', 'ASC' ] ],
          where: {
              name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
          }
      })
      res.status(200).json(foundEvents)
  } catch (error) {
      res.status(500).json(error)
  }
})




//Find a specific event
events.get('/:name', async(req, res)=>{
  try{
    const foundEvent = await Event.findOne({
      where: {name: req.params.name},
      include: [{model: Stage, as: 'stages', include: {model: Band, as: 'band', where: {name:{[Op.like]: `%${req.query.name ? req.query.name : ''}%`}}} }]
    })
    res.status(200).json(foundEvent)
  }
  catch(error){
    res.status(500).json(error)
  }
  
})

//Create a event
events.post('/', async(req, res)=>{
  try{
    const newEvent = await Event.create(req.body)
    res.status(200).json({
      message: 'Successfully inserted a new Event',
      data: newEvent
    })
  }
  catch(error){
    res.status(500).json(error)
  }
})

//Update a event
events.put('/:id', async(req,res)=>{
  try{
    const updatedEvent = await Event.update(req.body, {
      where: {event_id: req.params.id}
    })
    res.status(200).json({message: `Successfully updated ${updatedEvent} event(s)`})
  }
  catch(error){
    res.status(500).json(error)
  }
})


// DELETE A event
events.delete('/:id', async (req, res) => {
  try {
      const deletedEvent = await Event.destroy({
          where: {
              event_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedEvent} event(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

//Export

module.exports= events