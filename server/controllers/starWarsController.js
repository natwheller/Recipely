const db = require('../models/starWarsModels');

const starWarsController = {};

starWarsController.getCharacters = async (req, res, next) => {
  // write code here
  try {
    const sqlString =
      'SELECT people.*,people.species_id FROM people LEFT OUTER JOIN species.name ON species._id = people.species_id';
    // const sqlString =
    //   'SELECT people.* FROM people INNER JOIN people.species_id ON species._id = people.species_id INNER JOIN people.homeworld_id ON planets._id = people.homeworld_id';
    // const sqlString = 'SELECT * FROM people';
    const dbQuery = await db.query(sqlString); //.then() ??
    console.log(dbQuery);
    res.locals.dbQuery = await dbQuery.rows; //parse as json?
    return next();
  } catch (err) {
    return next({
      log: `starWarsController.getCharacters: ERROR ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
      message:
        'Error occured in starWarsController.getCharacters. See server log for details.',
    });
  }
};

starWarsController.getSpecies = (req, res, next) => {
  // write code here

  next();
};

starWarsController.getHomeworld = (req, res, next) => {
  // write code here

  next();
};

starWarsController.getFilm = (req, res, next) => {
  // write code here

  next();
};

starWarsController.addCharacter = (req, res, next) => {
  // write code here

  next();
};

module.exports = starWarsController;
