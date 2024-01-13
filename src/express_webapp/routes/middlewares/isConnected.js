// Middleware for connection state
const session = require('express-session');

// Function for connection state control
function isConnected(req, res, next) {
  try {
    if (session.user !== undefined) {
      // Connected
      next();
    } else {
      // Not connected
      res.render('connect', { title: 'Connect' })
    }
  }
  catch {
    // Not connected
    res.render('connect', { title: 'Connect' })
  }
}

module.exports = { isConnected };
