module.exports = function departmentAuthorize() {
  return (req, res, next) => {
    const userDept = req.user.dept; // req.user is set by Authentication.js
    const formDept = req.body.dept || req.params.dept; 

    if (userDept !== formDept) {
      return res.status(403).json({ message: "Not authorized to edit this department's form" });
    }
    next();
  };
};

