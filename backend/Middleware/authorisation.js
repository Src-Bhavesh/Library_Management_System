const jwt = require("jsonwebtoken");

const authorizeRooles = (authrole)=>{
  return (req, res, next) => {
    if(!req.user || req.user.role!== authrole){
      return res.status(403).json({error : "Access not allowed "})
    }
    next();
  }
}

module.exports = authorizeRooles;