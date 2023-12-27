// Middleware for connection state

// Function for connection state control
function isConnected(req, res, next) {
  try {
    if (req.session.user !== undefined) {
      // Connected
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
