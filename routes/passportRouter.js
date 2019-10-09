const express = require("express");
const passportRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");
const Message = require("../models/message");

//check roles
function checkRoles(role) {
  return function(req, res, next) {
    if (req.user.role === "ADMIN") {
      return next();
    } else {
      res.redirect('/private-chat')
    }
  }
};

const checkAdmin  = checkRoles('ADMIN');
 

//routes

passportRouter.get("/signup", (req, res) => {
  res.render("passport/signup");
});

passportRouter.post("/signup",  (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const disease = req.body.disease;
  if (username === "" || password === "" || name ==="" || disease==="" ) {
    res.render("passport/signup", { message: "Algum campo ainda não preenchido" });
    return;
  }
  
  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("passport/signup", { message: "nome de usuario já preenchido, favor escolher outro." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    
    const newUser = new User({
      username,
      name,
      password: hashPass,
      role:"ADMIN"
    });

    newUser.save((err) => {
      if (err) {
        res.render("passport/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

passportRouter.get("/login",  (req, res, next) => {
res.render("passport/login",{"message": req.flash("error")});
});

passportRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/chatAdmin",
  failureRedirect: "/login",
  //failureFlash: true,
  passReqToCallback: true
}));

passportRouter.get("/private-chat", ensureLogin.ensureLoggedIn(), (req, res) => {
  Message.find()
  .then(retorno => {
   
  res.render("passport/private", { user: req.user , retorno})
})

  .catch(err => console.log(err))
  
});

passportRouter.get("/chatAdmin", ensureLogin.ensureLoggedIn(), checkAdmin, (req, res) => {
  Message.find()
  
  .then(retorno => {
   
  res.render("passport/privateAdmin", { user: req.user , retorno})
})

  .catch(err => console.log(err))
  
});



passportRouter.get("/private-chat", ensureLogin.ensureLoggedIn(), (req, res) => {
  Message.find()
  .then(retorno => {
   
  res.render("passport/private", { user: req.user , retorno})
})

  .catch(err => console.log(err))
  
});

passportRouter.get("/admin", (req, res) => {
  const { username } = req.body;
  User.find({username})
  .then(users => {
    res.render('passport/privateAdmin', {users})

  })
  .catch(err=> console.log(err))
});



passportRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = passportRouter;