const Clase = require('../models/Clases')

const getClases = async (req, res, next) => {
  try {
    const { school } = req.query

    if (school) {
      const clase = await Clase.find({
        school: {
          $in: school,
        },
      })

      clase.length > 0
        ? res.json(clase)
        : res.status(400).json({
            msg: "Doesn't exist any clase from this school",
          })
    }

    const clase = await Clase.find()

    res.json(clase)
  } catch (error) {
    next(error)
  }
}

const getClaseById = async (req, res, next) => {
  try {
    const { id } = req.params

    const clase = await Clase.findOne({
      clase: id,
    })

    clase
      ? res.json(clase)
      : res.status(400).json({
          msg: "Doesn't exist any clase with this id",
        })
  } catch (error) {
    next(error)
  }
}

const createClase = async (req, res, next) => {
  try {
    const { nombre, clase, description, school } = req.body

    const newClase = new Clase({
      school,
      clase,
      nombre,
      description,
    })

    await newClase.save((err, data) => {
      if (err) return res.status(400).json({ 'Aquí esta el error': err })

      return res.json({ msg: 'clase succesfully created' })
    })
  } catch (error) {
    next(error)
  }
}

const updateClase = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nombre, clase, description, school } = req.body

    if (!id) return res.status(400).json({ msg: 'Please put a valid clase id' })

    const claseFind = await Clase.updateOne(
      { _id: id },
      {
        $push: {
          school: {
            $each: school,
          },
        },
        clase,
        nombre,
        description,
      },
      { upsert: true }
    )

    claseFind
      ? res.json({ msg: 'clase succesfully modified' })
      : res.status(400).json({ msg: "Doesn't exist any materia with that id" })
  } catch (error) {
    next(error)
  }
}

const deleteClase = async (req, res, next) => {
  try {
    const { id } = req.params

    const del = await Clase.deleteOne({
      _id: id,
    })
    console.log(del)
    del.deletedCount > 0
      ? res.json({ msg: 'school succesfully deleted' })
      : res.status(400).json({ msg: "doesn't exist any clase with this id" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getClases,
  getClaseById,
  createClase,
  updateClase,
  deleteClase,
}
