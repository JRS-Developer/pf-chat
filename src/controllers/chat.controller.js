const Chat = require('../models/Chat')
// const Materia = require('../models/Materia')
// const Clase = require('../models/Clases')
// const User = require('../models/User')
const Joi = require('joi')

const getChatByclaseSchema = Joi.object({
  materia_id: Joi.string().uuid().required(),
  clase_id: Joi.string().uuid().required(),
  school_id: Joi.string().uuid().required(),
  ciclo_lectivo_id: Joi.string().uuid().required(),
})

const createChatSchema = Joi.object({
  description: Joi.string().required(),
  clase: Joi.array().items(Joi.string().uuid()).required(),
  // participants: Joi.array().required(),
})

const updateChatSchema = Joi.object({
  description: Joi.string().allow(''),
  // clase: Joi.array().items(Joi.string().uuid()), // WARN: No deberia dejar actualizar la clase
  // participants: Joi.array().required(),
})

const getChats = async (req, res, next) => {
  try {
    const chat = await Chat.find().sort('-create').limit(50)

    chat.length > 0
      ? res.json(chat)
      : res.status(400).json({
          msg: "Doesn't exist any chat from this School",
        })
  } catch (error) {
    next(error)
  }
}

const getChatByclase = async (req, res, next) => {
  try {
    const { materia_id, clase_id, school_id, ciclo_lectivo_id } = req.query

    const { error } = getChatByclaseSchema.validate(req.params)

    if (error) return res.status(400).json({ msg: error.details[0].message })

    // Uno los params en un array clase para buscar en el modelo
    const clase = [materia_id, clase_id, school_id, ciclo_lectivo_id]

    let query = {
      clase: { $all: clase },
    }

    const chat = await Chat.findOne(query)
    console.log(chat)
    chat
      ? res.json(chat)
      : res.status(400).json({
          msg: "Doesn't exist a chat from this materia",
        })
  } catch (error) {
    next(error)
  }
}

const createChat = async (req, res, next) => {
  try {
    const { description, clase /* , participants */ } = req.body
    const data = { description, clase /* , participants */ }

    const { error } = createChatSchema.validate(data)

    if (error) return res.status(400).json({ msg: error.details[0].message })

    const newChat = new Chat(data)

    newChat.save((err) => {
      if (err) return res.status(400).json(err)

      return res.json({ msg: 'chat succesfully created' })
    })
  } catch (error) {
    next(error)
  }
}

const upDateChat = async (req, res, next) => {
  try {
    const { id } = req.params
    // WARN: No se deberia actualizar la clase, solo el description
    const { description /*  clase */ /* , participants */ } = req.body

    const data = { description /* , clase */ /* , participants */ }

    const { error } = updateChatSchema.validate(data)

    if (error) return res.status(400).json({ msg: error.details[0].message })

    const chatFind = await Chat.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          description: description,
          // clase: clase,
          // participants: participants,
        },
      },
      { upsert: true }
    )

    chatFind
      ? res.json({ msg: 'chat succesfully modified' })
      : res.status(400).json({ msg: "Doesn't exist any chat with that id" })
  } catch (error) {
    next(error)
  }
}

const updateParticipants = async (req, res, next) => {
  try {
    const { id } = req.params
    const { participants } = req.body

    const chatFind = await Chat.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          participants: {
            $each: participants,
          },
        },
      },
      { upsert: true }
    )

    chatFind
      ? res.json({ msg: 'chat succesfully modified' })
      : res.status(400).json({ msg: "Doesn't exist any chat with that id" })
  } catch (error) {
    next(error)
  }
}

const deleteChat = async (req, res, next) => {
  try {
    const { id } = req.params

    const del = await Chat.deleteOne({
      _id: id,
    })

    del.deletedCount > 0
      ? res.json({ msg: 'Chat succesfully deleted' })
      : res.status(400).json({ msg: "doesn't exist any Chat with this id" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getChats,
  getChatByclase,
  createChat,
  upDateChat,
  updateParticipants,
  deleteChat,
}
