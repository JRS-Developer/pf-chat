const PrivateChats = require('../models/PrivateChats')

const getPChatsBySender = async (req, res, next) => {

    try{
        const { sender_id } = req.params

        const chat = await PrivateChats.find({
            sender_id
        }).sort('-create').limit(20)

        res.json(chat);
          
    } catch (error){
        next(error)
    };

};

const getPChatsByMembers = async (req, res, next) => {

    try{
        
        const { sender_id, receiver_id} = req.params

        const chat = await PrivateChats.find({
                sender_id,
                receiver_id
            });
        
        res.json(chat);
          
    } catch (error){
        next(error)
    };

};


const createPChat = async (req, res, next) => {
    try{

        const {sender_id, receiver_id} = req.body

       
        const newP = new PrivateChats({
            members: {
                sender_id,
                receiver_id
            }
        });

        const chatSaved = await newP.save();

        res.json(chatSaved);
        
    } catch(error){
        next(error);
    };
};


module.exports = {
    getPChatsBySender,
    getPChatsByMembers,
    createPChat,
}