const Chat = require('../models/Chat')

const getChats = async (req, res, next) => {

    try{
        
        
        
        const chat = await Chat.find().sort('-create').limit(10)

        res.json(chat);
          
    } catch (error){
        next(error)
    };

};

const getChatById = async (req, res, next) => {

    try{
        
        const {materia_id} = req.params

        if(materia_id){
            const chat = await Chat.findOne({
                materia_id: materia_id
            })
            res.json(chat)
        }
          
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

        const chatSaved = await newChat.save();

        res.json(chatSaved)
        
    } catch(error){
        next(error);
    };
};
const upDateChat = async (req, res, next) => {
    try{

        const {chat_id} = req.params;
        const {description, materia_id} = req.body;

        const chat = await Chat.findByIdAndUpdate(chat_id,{

        description: description,
        materia_id: materia_id,

        });

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