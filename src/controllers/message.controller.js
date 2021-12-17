const Message = require('../models/Message');
const Chat = require('../models/Chat');

const get_msgByChat = async (req, res, next) => {
    try{
            const {chat_id} = req.params

            const msgs = await Message.find({
                chat_id
            });
        
            (msgs.length !== 0) ? res.json(msgs) : res.status(400).json({ msg: "Doesn't exist any messages from this chat, maybe the chat_id doesn't correct"})

    } catch(error){
        next(error);
    };
};


const createMsg = async (req, res, next) => {

    try{
        const {
            chat_id, 
            user_id, 
            message, 
            parent_id
        } = req.body

        const msg = new Message({
            chat_id, 
            user_id, 
            message, 
            parent_id
        })

        const newMsg = await msg.save((err, data) => {
            if(err) return res.status(400).json(err)

            return data
        });

        res.json(newMsg);
    
    } catch(error){
        next(error);
    };
};

module.exports = {
    get_msgByChat,
    createMsg,
}