const User = require('../models/User');

const get_users = async (req, res, next) => {
    try{
            const {chat, name} = req.query

            if(chat && name){
                const user = await User.find({
                    chat
                });
                const filtered = user.filter(user => {
                    return user.username.includes(name) || user.fullname.includes(name)
                });
                return res.json(filtered);
            };

            if(chat){
                const user = await User.find({
                    chat: chat
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

            const user = await User.find();

            res.json(user);

    } catch(error){
        next(error);
    };
};

const getById = async (req, res, next) => {
    try {
        
        const {id} = req.params;

        const user = await User.findById({
            user: id
        });

        user ? res.json(user) : res.status(400).json({ msg: "There isn't any user with that id"});

    } catch (error) {
        next(error);
    };
};


const createUser = async (req, res, next) => {

    try{
        const {
            user, 
            rol, 
            email,
            username,
            fullname,
            avatar
        } = req.body

        const newUser = new User({
            user, 
            rol,
            email, 
            username,
            fullname,
            avatar
        })

       await newUser.save((err, data) => {
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
            user, 
            rol, 
            email,
            username,
            fullname,
            avatar
        } = req.body;

        if(!id) return res.status(400).json({ msg: "Please put a valid user_id"});

        const userFind = await User.UpdateOne({_id: id}, {

            user, 
            rol, 
            username,
            fullname,
            email,
            avatar

        }, {upsert: true});

        userFind ? res.json({ msg: "user succesfully created"}): res.status(400).json({ msg: "Please put a valid user_id"});

    } catch (error) {
        next(error);
    };
};

const deleteUser = async (req, res, next) => {

    try{
        const {id} = req.params

        const del = await User.deleteOne({
            _id: id
        }
        );
        
        del.deletedCount > 0 ? res.json({msg: "user has been deleted"}) : res.status(400).json({msg: "doesn't exist any user with this id"})
    } catch(error){
        next(error);
    };
};

module.exports = {
    get_users,
    getById,
    createUser,
    updateUser,
    deleteUser
}