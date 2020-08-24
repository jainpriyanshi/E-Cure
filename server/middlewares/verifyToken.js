const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'].split(' ')[1];
    try { 
      if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
      jwt.verify(token, keys.secretOrKey, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
       userId = decoded.id;
       req.userId = userId;
       next();
      });  
    }
    catch(err) {
      console.log(err);
         return res.status(403).send({ auth: false, message: 'Token verification failed.' });
    }
    
}