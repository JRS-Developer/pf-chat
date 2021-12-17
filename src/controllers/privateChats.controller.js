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

        const validate = await PrivateChats.findOne({
            
            $or: [
                {
                    members: {
                        $in: [sender_id]
                    }
                }, 
                {
                    members: {
                        $in: [receiver_id]
                    }
                }
            ]
            
        })


        if(validate) return res.status(500).json({ msg: `this private conversation already exist with this id: ${validate._id}`})

        const chatSaved = await newP.save();
            
        res.json(chatSaved);
        
    } catch(error){
        next(error);
    };
};


module.exports = {
    getPChatsByUser,
    getPChatsByMembers,
    createPChat,
}