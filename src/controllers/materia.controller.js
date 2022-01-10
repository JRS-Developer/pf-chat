const Materia = require('../models/Materia')

const getMaterias = async (req, res, next) => {
  try {
    const { clase } = req.query

    if (clase) {
      const materia = await Materia.find({
        clase,
      })

      materia.length > 0
        ? res.json(chat)
        : res.status(400).json({
            msg: "Doesn't exist any materia with this class_id",
          })
    }

    const materia = await Materia.find()

    res.json(materia)
  } catch (error) {
    next(error)
  }
}

const getMateriaById = async (req, res, next) => {
  try {
    const { id } = req.params

    const materia = await Materia.findOne({
      materia: id,
    })

    materia
      ? res.json(materia)
      : res.status(400).json({
          msg: "Doesn't exist a chat from this materia",
        })
  } catch (error) {
    next(error)
  }
}

const createMateria = async (req, res, next) => {
  try {
    const { nombre, clase, description, materia } = req.body

    const newMateria = new Materia({
      materia,
      clase,
      nombre,
      description,
    })

    await newMateria.save((err, data) => {
      if (err) return res.status(400).json(err)

      return res.json({ msg: 'materia succesfully created' })
    })
  } catch (error) {
    next(error)
  }
}

const updateMateria = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nombre, clase, description, materia } = req.body

    if (!id)
      return res.status(400).json({ msg: 'Please put a valid materia id' })

    const materiaFind = await Materia.updateOne(
      { _id: id },
      {
        $push: {
          clase: {
            $each: clase,
          },
        },
        materia,
        nombre,
        description,
      },
      { upsert: true }
    )

    materiaFind
      ? res.json({ msg: 'materia succesfully modified' })
      : res.status(400).json({ msg: "Doesn't exist any materia with that id" })
  } catch (error) {
    next(error)
  }
}

const deleteMateria = async (req, res, next) => {
  try {
    const { id } = req.params

    const del = await Materia.deleteOne({
      _id: id,
    })

    del.deletedCount > 0
      ? res.json({ msg: 'materia succesfully deleted' })
      : res.status(400).json({ msg: "doesn't exist any materia with this id" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria,
}
