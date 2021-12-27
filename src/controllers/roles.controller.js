const Roles = require('../models/Roles');

const get_roles = async (req, res, next) => {
    try{

        const role = await Roles.find();

        role ? res.json(role) : res.status(400).json({ msg: "Doesn't exist any role"})

    } catch(error){
        next(error);
    };
};

const getRoleById = async (req, res, next) => {
    try {
        
        const {role} = req.params;

        const roleFind = await Roles.findOne({
            role: role
        });

        roleFind ? res.json(roleFind) : res.status(400).json({ msg: "There isn't any role with that id"});

    } catch (error) {
        next(error);
    };
};


const createRole = async (req, res, next) => {

    try{
        const {
            role,
            name,
            description  
        } = req.body

        const newRole = new Roles({
            role,
            name,
            description  
        })

       await newRole.save((err, data) => {
            if(err) return res.status(400).json(err)

            return res.json({msg: "role succesfully created"})
        });

    
    } catch(error){
        next(error);
    };
};

const updateRole = async (req, res, next) => {
    try {
        
        const { id } = req.params
        const { 
            role,
            name,
            description  
        } = req.body;

        if(!id) return res.status(400).json({ msg: "Please put a valid role_id"});

        const roleFind = await Roles.findOneAndUpdate({_id: id},{ '$set': {

            role,
            name,
            description 

        }, 
        },{upsert: true});

        roleFind ? res.json({ msg: "role succesfully created"}): res.status(400).json({ msg: "Please put a valid role_id"});

    } catch (error) {
        next(error);
    };
};

const deleteRole = async (req, res, next) => {

    try{
        const {role} = req.params

        const del = await Roles.deleteOne({
            _id: role
        });

        del.deletedCount > 0 ? res.json({msg: "role succesfully deleted"}) : res.status(400).json({msg: "doesn't exist any role with this id"})
    } catch(error){
        next(error);
    };
};

module.exports = {
    get_roles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}