const Chat = require('../models/Chat');
const Materia = require('../models/Materia');

const getChats = async (req, res, next) => {

    try{
        
        const chat = await Chat.find().sort('-create').limit(20)

        chat.length > 0 ? res.json(chat) : res.status(400).json({
            msg: "Doesn't exist any chat from this School"
        })
          
    } catch (error){
        next(error)
    };

};

const getChatById = async (req, res, next) => {

    try{
        
        const {materia_id, class_id} = req.params

            const materia = await Materia.findOne({
                materia_id: materia_id
            });

            const chat = await Chat.findOne({
                materia_id: materia._id,
                class_id: class_id
            });

            chat ? res.json(chat) : res.status(400).json({
                msg: "Doesn't exist a chat from this materia"
            })
        
          
    } catch (error){
        next(error);
    };

};


const createChat = async (req, res, next) => {
    try{

        const {description, materia_id} = req.body

        const newChat = new Chat({

        description,
        materia_id,

        });

        await newChat.save((err, data) => {
            if(err) return res.status(400).json(err)

            return res.json({msg: "chat succesfully created"}) 
        });

        
        
    } catch(error){
        next(error)
    };
};
const upDateChat = async (req, res, next) => {
    try{

        const {chat_id} = req.params;
        const {description, materia_id} = req.body;


        if(!chat_id) return res.status(400).json({ msg: "Please put a valid chat_id"})

        const chat = await Chat.findOneAndUpdate({_id: chat_id},{ '$set': {

                description: description,
                materia_id: materia_id,

            }, 
        },{upsert: true});

       chat ? res.json({msg: "chat succesfully modified"}) : res.status(400).json({ msg: "Doesn't exist any chat with that id"})

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