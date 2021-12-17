const Chat = require('../models/Chat')

export const get_chats = async (req, res, next) => {

    try{
        const {materia_id} = req.params

        const chat = await Chat.find({
            materia_id: materia_id
        });

        res.json(chat)

    } catch (error){
        next(error)
    };

};

export const create_chat = async (req, res, next) => {
    try{

        const {description, materia_id} = req.body

        const newChat = new Chat({

        description,
        materia_id,

        });

        const savedChat = await newChat.save((error)=>{
            if(error) throw error 
        });

        res.json(savedChat);
    } catch(error){
        next(error);
    };
};

export const upDate_chat = async (req, res, next) => {
    try{

        const {description, materia_id} = req.body

        const newChat = Chat.upDate({

        description,
        materia_id,

        });

        const savedChat = await newChat.save();

        res.json(savedChat);
    } catch(error){
        next(error);
    };
};