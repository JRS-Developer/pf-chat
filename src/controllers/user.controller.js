const User = require('../models/User');

const get_users = async (req, res, next) => {
    try{
            const {chat_id, name} = req.query

            if(chat_id && name){
                const user = await User.find({
                    chat_id
                });
                const filtered = user.filter(user => {
                    return user.username.includes(name) || user.fullname.includes(name)
                });
                return res.json(filtered);
            };

            if(chat_id){
                const user = await User.find({
                    chat_id
                });
                return res.json(user)
            };

            if(name){
                const user = await User.find({
                    $or: [{
                        username: {
                            $in: name
                        }
                    }, {
                        fullname: {
                            $in: name
                        }
                    }]
                });

                return res.json(user);
            };

            const user = User.find();

            res.json(user);

    } catch(error){
        next(error);
    };
};

const getById = async (req, res, next) => {
    try {
        
        const {id} = req.params;

        const user = await User.findById({
            user_id: id
        });

        user ? res.json(user) : res.status(400).json({ msg: "There isn't any user with that id"});

    } catch (error) {
        next(error);
    };
};


const createUser = async (req, res, next) => {

    try{
        const {
            chat_id, 
            user_id, 
            rol_id, 
            username,
            fullname,
            avatar
        } = req.body

        const user = new User({
            chat_id, 
            user_id, 
            rol_id, 
            username,
            fullname,
            avatar
        })

       await user.save((err, data) => {
            if(err) return res.status(400).json(err)

            return res.json({msg: "user succesfully created"})
        });

    
    } catch(error){
        next(error);
    };
};

const updateUser = async (req, res, next) => {
    try {
        
        const { id } = req.params
        const {
            chat_id, 
            user_id, 
            rol_id, 
            username,
            fullname,
            avatar
        } = req.body;

        if(!id) return res.status(400).json({ msg: "Please put a valid user_id"});

        const user = await Chat.findOneAndUpdate({_id: chat_id},{ '$set': {

            chat_id, 
            user_id, 
            rol_id, 
            username,
            fullname,
            avatar

        }, 
        },{upsert: true});

        user ? res.json({ msg: "user succesfully created"}): res.status(400).json({ msg: "Please put a valid user_id"});

    } catch (error) {
        next(error);
    };
};

module.exports = {
    get_users,
    getById,
    createUser,
    updateUser
}