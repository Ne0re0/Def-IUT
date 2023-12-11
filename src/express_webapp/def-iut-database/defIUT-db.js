const dbConnection = require('./sqlite_connection');
const usersDAO = require('./UsersDAO');
const badgesDAO = require('./BadgesDAO');
const ownsDAO = require('./OwnsDAO');
const categoriesDAO = require('./CategoriesDAO');
const dockersDAO = require('./DockersDAO');
const challengesDAO = require('./ChallengesDAO');
const filesDAO = require('./FilesDAO');


module.exports = {
  db : dbConnection,
  usersDAO : usersDAO,
  badgesDAO : badgesDAO,
  ownsDAO : ownsDAO,
  categoriesDAO : categoriesDAO,
  dockersDAO : dockersDAO,
  challengesDAO : challengesDAO,
  filesDAO : filesDAO
};
