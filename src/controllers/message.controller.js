const Message = require('../models/Message')
const User = require('../models/User')

const get_msgByChat = async (req, res, next) => {
  try {
    const { chat } = req.params

    const msgs = await Message.find({
      chat,
    })

    res.json(msgs)
  } catch (error) {
    next(error)
  }
}

const createMsg = async (req, res, next) => {
  try {
    const { chat, user, message, parent } = req.body

    const msg = new Message({
      chat,
      user,
      message,
      parent,
    })

    // await Message.aggregate({
    //   $lookup: {
    //     from: User,
    //     localfield: user,
    //     foreignField: _id,
    //     as: sender,
    //   },
    // })
    //
    msg.save((err, data) => {
      if (err) return res.status(400).json(err)
      console.log('new Message created', data)

      return res.json(data)
    })
  } catch (error) {
    next(error)
  }
}

const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params
    const { chat, user, message, parent } = req.body

    if (!id) return res.status(400).json({ msg: 'Please put a valid role_id' })

    const MessageFind = await Message.findOneAndUpdate(
      { id: id },
      {
        $set: {
          chat,
          user,
          message,
          parent,
        },
      },
      { upsert: true }
    )

    MessageFind
      ? res.json({ msg: 'message succesfully updated' })
      : res.status(400).json({ msg: 'Please put a valid message id' })
  } catch (error) {
    next(error)
  }
}

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params

    await Message.deleteOne(
      {
        id: id,
      },
      (err) => {
        if (err)
          return res
            .status(400)
            .json({ msg: "doesn't exist any message with this id" })

        return res.json({ msg: 'message has been eliminated' })
      }
    )
  } catch (error) {
    next(error)
  }
}

module.exports = {
  get_msgByChat,
  createMsg,
  updateMessage,
  deleteMessage,
}
