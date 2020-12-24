const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');
passport.use(
  'local.signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;
      // guardar en la BD
      const newUser = {
        username,
        password,
        fullname,
      };
      newUser.password = await helpers.encryptPassword(password);
      const result = await pool.query('INSERT INTO users set ?', [newUser]); //save BD MYSQL
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(nul, user.id);
});
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users where is = ?', [id]);
  done(null, rows[0]);
});
