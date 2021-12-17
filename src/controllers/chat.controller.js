const Chat = require('../models/Chat')

const getChats = async (req, res, next) => {

    try{
        
        const chat = await Chat.find().sort('-create').limit(10)

        chat ? res.json(chat) : res.status(500).json({
            msg: "Doesn't exist any chat from this School"
        })
          
    } catch (error){
        next(error)
    };

};

const getChatById = async (req, res, next) => {

    try{
        
        const {materia_id} = req.params

     
            const chat = await Chat.findOne({
                materia_id: materia_id
            })

            chat ? res.json(chat) : res.status(500).json({
                msg: "Doesn't exist a chat from this materia"
            })
        
          
    } catch (error){
        next(error)
    };

};


const createChat = async (req, res, next) => {
    try{

        const {description, materia_id} = req.body

        const newChat = new Chat({

        description,
        materia_id,

        });

        const chatSaved = await newChat.save((err, data) => {
            if(err) return res.status(500).json(err)

            return data
        });

        res.json(chatSaved) 
        
    } catch(error){
        next(error)
    };
};
const upDateChat = async (req, res, next) => {
    try{

        const {chat_id} = req.params;
        const {description, materia_id} = req.body;


        if(!chat_id) return res.status(500).json({ msg: "Please put a valid chat_id"})

        const chat = await Chat.findOneAndUpdate({_id: chat_id},{ '$set': {

                description: description,
                materia_id: materia_id,

            }, 
        },{upsert: true});

        res.json(chat)

    } catch(error){
        next(error);
    };
};

module.exports = {
    getChats,
    getChatById,
    createChat,
    upDateChat,
}