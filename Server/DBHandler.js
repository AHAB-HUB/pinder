var connection = require('./database');
var moment = require('moment');

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function addUser(firstName, lastName, email, password, birthday) {
  connection.query(
    'INSERT INTO users SET firstName = ?, lastName = ?, email = ?, password =?, birthday=?', [firstName, lastName, email, password, birthday],
    function(err, result) {
      return (err) ? err : result;
    });
}

const updateUser = async (data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE users SET firstName = ?, lastName = ?, email = ?, password =?, birthday= ? where id = ?',
      [data.firstName, data.lastName, data.email, data.password, data.birthday, data.id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
  });
}

const updatePet = async (data) => {

  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE pets SET name  = ?, description = ?, birthday = ?, type = ?, gender = ? where id = ? ',
      [data.name, data.description, data.birthday, data.type, data.gender, data.id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
  });
}

//delete a pet from db
function deletePet(petID, callback) {
  connection.query(
    'DELETE from pets WHERE id = ?', [petID], callback);
}

// add a pet to db
const addPet = async (json, id) => {
  console.log(json);
  connection.query(
    'INSERT INTO pets SET name = ?, birthday = ?, gender = ?, description = ?, type = ?, users_id = ?',
    [json.name, json.birthday, json.gender, json.description, json.type, json.users_id],
    (err, results) => {
      if (err) return reject(err);
      resolve(results);
    })
}

const maxId = async () => {
  connection.query(
    'SELECT  (MAX(id) + 1) FROM pets',
    (err, results) => {
      if (err) return reject(err);
      resolve(results);
    })
}

//login authentication
function logedIn(email, password, callback) {
  connection.query('SELECT COUNT(*) AS cnt, id FROM users WHERE email = ? AND password =?',
    [email, password], callback);
}

function emailExists(email, callback) {
  connection.query('SELECT count(*) AS cnt FROM users WHERE email = ?', [email], callback);
}

const getUser = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

const getComments = async (petID) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT concat(users.firstName, "  ",users.lastName) as name, likes.comment, likes.pets_id as likes FROM users, likes WHERE users.id = likes.users_id AND likes.pets_id = ?',
      [petID], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
  });
}

const getPets = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM pets WHERE users_id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

const getAllPets = async () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM pets', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function addImage(userID, fileName, defaultpic = 0, petID = 0, callback) {
  connection.query('INSERT INTO photos SET url = ?, defaultpic = ?, pets_id = ?, users_id = ?',
   [fileName, defaultpic, (petID == 0) ? null : petID, userID], callback);
}

const getImages = async (userID, petID) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT url from photos WHERE users_id = ?  AND pets_id ${(petID == 0)? "IS":"="} ?`,
      [userID, (petID == 0) ? null : petID], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
  });
}

// added by nuno
const getAllPetsImages = async () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM photos', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

const getAllLikes = async () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM likes', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}


// like per pet id
const getLikePetId = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM likes WHERE pets_id = ? ', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

const makeLike = (body) => {
  return new Promise(function(resolve, reject) {
    connection.query('INSERT INTO likes (users_id, pets_id, comment) VALUES (?,?,?)',
    [body.users_id, body.pets_id, body.comment],
    (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

const getImage = async (petID) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT url from photos WHERE pets_id = ?`,
      [petID], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
  });
}



module.exports = {
  getUsers: getUsers,
  addUser: addUser,
  emailExists: emailExists,
  updateUser: updateUser,
  updatePet: updatePet,
  getUser: getUser,
  getAllPets: getAllPets,
  getPets: getPets,
  addPet: addPet,
  deletePet: deletePet,
  addImage: addImage,
  getImage: getImage,
  getImages: getImages,
  logedIn: logedIn,
  getComments: getComments,
  makeLike: makeLike,
  getLikePetId: getLikePetId,
  getAllLikes: getAllLikes,
  getAllPetsImages: getAllPetsImages,//


}
