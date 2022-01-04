const PrivateChats = require('../models/PrivateChats')

const getPChatsByUser = async (req, res, next) => {

    try{
        const { sender } = req.params

        const chat = await PrivateChats.find({
            members: {
                $in: [sender]
            }
        }).sort('-create').limit(20)

        res.json(chat);
          
    } catch (error){
        next(error)
    };

};

const getPChatsByMembers = async (req, res, next) => {

    try{
        
        const { sender, receiver} = req.params

       
            const chat = await PrivateChats.find({
                members: {
                    $all: [sender, receiver]
                }
            });
        
        res.json(chat);
          
    } catch (error){
        next(error)
    };

};


const createPChat = async (req, res, next) => {
    try{

        const {sender, receiver} = req.body
 
        const newP = new PrivateChats({
            members: [sender, receiver]
        });

        await PrivateChats.aggregate(
            
            {
                $lookup:
                {
                   from: User,
                   localfield: user,
                   foreignField: _id,
                   as: sender
                }
            }      
        
    )

        await newP.save((err, data) => {
            if(err) return res.status(400).json(err);

            return res.json({msg: "message succesfully created"})
        });
        
    } catch(error){
        next(error);
    };
};

const updatePChat = async (req, res, next) => {
    try {
        
        const { id } = req.params
        const { 
            sender, 
            receiver
        } = req.body;

        if(!id) return res.status(400).json({ msg: "Please put a valid role_id"});

        const PChat= await PrivateChats.updateOne({_id:id}, {
            
            $push: {
                members: [sender, receiver]
            }    

        }, {upsert: true});

        PChat ? res.json({ msg: "message succesfully updated"}): res.status(400).json({ msg: "Please put a valid message id"});

    } catch (error) {
        next(error);
    };
};

const deletePChat = async (req, res, next) => {

    try{
        const {id} = req.params

       const del = await PrivateChats.deleteOne({
            _id: id
        });

        del.deletedCount > 0 ? res.json({msg: "Private Chat succesfully deleted"}) : res.status(400).json({msg: "doesn't exist any Private Chat with this id"})
    } catch(error){
        next(error);
    };
};


module.exports = {
    getPChatsByUser,
    getPChatsByMembers,
    createPChat,
    updatePChat,
    deletePChat
}