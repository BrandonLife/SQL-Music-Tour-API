//Dependencies
const bands = require('express').Router()
const db = require('../models')

const {Band, Meet_greet, Event, Set_time} = db

const {Op} = require('sequelize')


   
// FIND ALL BANDS
bands.get('/', async (req, res) => {
  try {
      const foundBands = await Band.findAll({
          order: [ [ 'available_start_time', 'ASC' ] ],
          where: {
              name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
          }
      })
      res.status(200).json(foundBands)
  } catch (error) {
      res.status(500).json(error)
  }
})




//Find a specific band
bands.get('/:name', async(req, res)=>{
  try{
    const foundBand = await Band.findOne({
      where: {name: req.params.name},
      include: [{model: Meet_greet, as: 'meet_greets', include: {model: Event, as: 'event', where: {name: {[Op.like]: `%${req.query.event ? req.query.event : ''}%`}}}}, {model: Set_time, as: 'set_times', include: {model: Event, as:"event", where: {name: {[Op.like]: `%${req.query.event ? req.query.event: ''}%`}}}}]
    })
    res.status(200).json(foundBand)
  }
  catch(error){
    res.status(500).json(error)
  }
  
})

//Create a band
bands.post('/', async(req, res)=>{
  try{
    const newBand = await Band.create(req.body)
    res.status(200).json({
      message: 'Successfully inserted a new band',
      data: newBand
    })
  }
  catch(error){
    res.status(500).json(error)
  }
})

//Update a band
bands.put('/:id', async(req,res)=>{
  try{
    const updatedBand = await Band.update(req.body, {
      where: {band_id: req.params.id}
    })
    res.status(200).json({message: `Successfully updated ${updatedBand} band(s)`})
  }
  catch(error){
    res.status(500).json(error)
  }
})


// DELETE A BAND
bands.delete('/:id', async (req, res) => {
  try {
      const deletedBands = await Band.destroy({
          where: {
              band_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedBands} band(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

//Export

module.exports= bands