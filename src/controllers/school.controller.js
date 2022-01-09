const School = require('../models/School')

const get_school = async (req, res, next) => {
  try {
    const school = await School.find({})

    res.send(school)
  } catch (error) {
    next(error)
  }
}

const getSchoolById = async (req, res, next) => {
  try {
    const { id } = req.params

    const school = await School.findOne({
      id: id,
    })

    res.send(school)
  } catch (error) {
    next(error)
  }
}

const createSchool = async (req, res, next) => {
  try {
    const { id, nombre, description } = req.body

    const newSchool = new School({
      id,
      nombre,
      description,
    })

    await newSchool.save((err, data) => {
      if (err) return res.status(400).json(err)

      return res.json({ msg: 'school succesfully created' })
    })
  } catch (error) {
    next(error)
  }
}

const updateSchool = async (req, res, next) => {
  try {
    const { school_id } = req.params
    const { id, nombre, description } = req.body

    if (!school_id)
      return res.status(400).json({ msg: 'Please put a valid school id' })

    const schoolFind = await School.findOneAndUpdate(
      { _id: school_id },
      {
        $set: {
          id,
          nombre,
          description,
        },
      },
      { upsert: true }
    )

    schoolFind
      ? res.json({ msg: 'school succesfully updated' })
      : res.status(400).json({ msg: 'Please put a valid user_id' })
  } catch (error) {
    next(error)
  }
}

const deleteSchool = async (req, res, next) => {
  try {
    const { id } = req.params

    const del = await School.deleteOne({
      _id: id,
    })

    del.deletedCount > 0
      ? res.json({ msg: 'school succesfully deleted' })
      : res.status(400).json({ msg: "doesn't exist any school with this id" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  get_school,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
}
