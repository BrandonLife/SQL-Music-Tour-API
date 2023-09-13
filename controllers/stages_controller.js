const stages = require('express').Router()
const db = require('../models')

const {Stage, Event} = db

const {Op} = require('sequelize')

   
// FIND ALL events
stages.get('/', async (req, res) => {
  try {
      const foundStages = await Stage.findAll()
      res.status(200).json(foundStages)
  } catch (error) {
      res.status(500).json(error)
  }
})




//Find a specific event
stages.get('/:name', async(req, res)=>{
  try{
    const foundStage = await Stage.findOne({
      where: {name: req.params.name}, include: {model: Event, as: 'events', where: {name: {[Op.like]: `%${req.query.name ? req.query.name: ''}%`}}}
    })
    res.status(200).json(foundStage)
  }
  catch(error){
    res.status(500).json(error)
  }
  
})

//Create a event
stages.post('/', async(req, res)=>{
  try{
    const newStage = await Stage.create(req.body)
    res.status(200).json({
      message: 'Successfully inserted a new Stage',
      data: newStage
    })
  }
  catch(error){
    res.status(500).json(error)
  }
})

//Update a event
stages.put('/:id', async(req,res)=>{
  try{
    const updatedStage = await Stage.update(req.body, {
      where: {stage_id: req.params.id}
    })
    res.status(200).json({message: `Successfully updated ${updatedStage} stage(s)`})
  }
  catch(error){
    res.status(500).json(error)
  }
})


// DELETE A event
stages.delete('/:id', async (req, res) => {
  try {
      const deletedStage = await Stage.destroy({
          where: {
              stage_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedStage} stage(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

//Export

module.exports= stages