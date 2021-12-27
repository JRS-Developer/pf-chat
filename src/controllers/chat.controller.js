const Chat = require('../models/Chat');
const Materia = require('../models/Materia');
const Clase = require('../models/Clases');
const User = require('../models/User');

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
    const { materia, clase, id } = req.params

    const materia_id = await Materia.findOne({
        materia
    });
    console.log(materia_id)
    const clase_id = await Clase.findOne({
        clase
    });
    console.log(clase_id)
    const user_id = await User.findOne({
        user: id
    })
    console.log(user_id)
    const chat = await Chat.findOne({
         $and: [
          {
            clase: {
              $all: [materia_id._id, clase_id._id],
            }
          },
          {
            participants: user_id._id
          }
        ] 
    })
    console.log(chat)
    chat
      ? res.json(chat)
      : res.status(400).json({
          msg: "Doesn't exist a chat from this materia",
        })
  } catch (error) {
    next(error);
  };
};

const createChat = async (req, res, next) => {
  try {
    const { description, clase, participants } = req.body

    const newChat = new Chat({
      description,
      clase: clase,
      participants: participants
    })

    await newChat.save((err, data) => {
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
    const { description, clase, participants } = req.body

    if (!id) return res.status(400).json({ msg: 'Please put a valid chat_id' })

    const chatFind = await Chat.findOneAndUpdate(
      { _id: id },
      { '$set':
        {
          description: description,
          clase:  clase,
          participants: participants
        },
      },
      { upsert: true }
    );

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

    if (!id) return res.status(400).json({ msg: 'Please put a valid chat_id' })

    const chatFind = await Chat.findOneAndUpdate(
      { _id: id },
      { 
        $push: {
          participants: {
            $each: participants
          }
        }
      },
      { upsert: true }
    );

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

    const del = await Chat.deleteOne(
      {
        _id: id,
      }
    );

    del.deletedCount > 0 ? res.json({msg: "Chat succesfully deleted"}) : res.status(400).json({msg: "doesn't exist any Chat with this id"})
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
