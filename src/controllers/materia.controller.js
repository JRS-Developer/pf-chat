const Materia = require('../models/Materia')

const getMaterias = async (req, res, next) => {

    try{
        
        const { class_id } = req.query;

        if(class_id){

            const materia = await Materia.find({
                class_id
            });

            materia.length > 0 ? res.json(chat) : res.status(400).json({
            msg: "Doesn't exist any materia with this class_id"
            });
        };
        
          
    } catch (error){
        next(error);
    };

};

const getMateriaById = async (req, res, next) => {

    try{
        
            const {materia_id} = req.params;

     
            const materia = await Materia.findOne({
                materia_id: materia_id
            });

            materia ? res.json(materia) : res.status(400).json({
                msg: "Doesn't exist a chat from this materia"
            });
        
          
    } catch (error){
        next(error);
    };

};

const createMateria = async (req, res, next) => {
    try{

        const {name, class_id, description, materia_id} = req.body

        const newMateria = new Materia({

            materia_id,
            class_id,
            name,
            description,

        });

        await newMateria.save((err, data) => {
            if(err) return res.status(400).json(err)

            return res.json({msg: "materia succesfully created"}) 
        });

        
        
    } catch(error){
        next(error);
    };
};

const updateMateria = async (req, res, next) => {
    try{

        const {id} = req.params;
        const {name, class_id, description, materia_id} = req.body;


        if(!id) return res.status(400).json({ msg: "Please put a valid materia id"})

        const materia = await Materia.findOneAndUpdate({_id: id},{ '$set': {

            materia_id: materia_id,
            class_id: class_id,
            name: name,
            description: description,

            }, 
        },{upsert: true});

       materia ? res.json({msg: "materia succesfully modified"}) : res.status(400).json({ msg: "Doesn't exist any materia with that id"})

    } catch(error){
        next(error);
    };
};

module.exports = {
    getMaterias,
    getMateriaById,
    createMateria,
    updateMateria,
}