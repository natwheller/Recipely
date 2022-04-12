const { query } = require('express');
const db = require('../models/starWarsModels');

const starWarsController = {};

starWarsController.getCharacters = async (req, res, next) => {
  // write code here
  try {
    //SQL reads right to left
    //reading first FROM adding tables horizontally from people, species & planets
    //lastly we're saying SELECT all of people's columns, species name, and planet name
    //we have to re-name (give aliases) since there are matching/shared keys (name key)
    const sqlString = `SELECT p.*, s.name AS species, h.name AS homeworld
      FROM people p 
      LEFT OUTER JOIN species s 
      ON s._id = p.species_id
      LEFT OUTER JOIN planets h
      ON h._id = p.homeworld_id`;
    // const sqlString = 'SELECT * FROM people';
    const dbQuery = await db.query(sqlString); //.then() ??
    // console.log(dbQuery);
    res.locals.getCharacters = await dbQuery.rows; //parse as json?
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
//classification, average_height, average_lifespan, language, name, and homeworld
starWarsController.getSpecies = async (req, res, next) => {
  // write code here
  //WHERE has to be nested so we can get a table and then do LEFT OUTER JOIN
  try {
    const queryStr = `SELECT species.*, p.name AS homeworld 
    FROM (SELECT * FROM species WHERE species._id = ${req.query.id}) species
    LEFT OUTER JOIN planets p
    ON p._id = species.homeworld_id`;
    const dbQuery = await db.query(queryStr);
    // console.log(dbQuery);
    res.locals.getSpecies = dbQuery.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `starWarsController.getSpecies: ERROR ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
      message:
        'Error occured in starWarsController.getSpecies. See server log for details.',
    });
  }
};

starWarsController.getHomeworld = async (req, res, next) => {
  // write code here
  try {
    const queryStr = `SELECT planets.*
    FROM planets
    WHERE planets._id = ${req.query.id}`;
    const dbQuery = await db.query(queryStr);
    // console.log(dbQuery);
    res.locals.getHomeworld = dbQuery.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `starWarsController.getHomeworld: ERROR ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
      message:
        'Error occured in starWarsController.getHomeworld. See server log for details.',
    });
  }
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
