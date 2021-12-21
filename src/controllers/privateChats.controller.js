const PrivateChats = require('../models/PrivateChats')

const getPChatsByUser = async (req, res, next) => {

    try{
        const { sender_id } = req.params

        const chat = await PrivateChats.find({
            members: {
                $in: [sender_id]
            }
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
                members: {
                    $in: [sender_id, receiver_id]
                }
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
            members: [sender_id, receiver_id]
        });

        await newP.save((err, data) => {
            if(err) return res.status(400).json(err);

            return res.json({msg: "message succesfully created"})
        });
        
    } catch(error){
        next(error);
    };
};


module.exports = {
    getPChatsByUser,
    getPChatsByMembers,
    createPChat,
}