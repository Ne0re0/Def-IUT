// Middleware for connection state
const session = require('express-session');

// Function for connection state control
function isConnected(req, res, next) {
  try {
    if (session.user !== undefined) {
      // Connected
      console.log("Connected = True");
      next();
    } else {
      // Not connected
      res.render('connect', { title: 'Connect' })
      console.log("Connected = False1");
    }
  }
  catch {
    // Not connected
    res.render('connect', { title: 'Connect' })
    console.log("Connected = False2");
  }
}

module.exports = { isConnected };
