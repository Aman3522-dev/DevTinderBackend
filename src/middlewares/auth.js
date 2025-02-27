const adminAuth =  (req, res, next) => {
    console.log("Admin auth is checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
      res.status(401).send("unauthorized access");
    }
      else {
        next();
    }
};

module.exports = {
    adminAuth,
};
