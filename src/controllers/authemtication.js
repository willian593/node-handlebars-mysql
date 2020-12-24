const { response } = require('express');
const pool = require('../database');
const passport = require('passport');

/*
=====================================
        PAGINA AGREGAR LINK
=====================================
*/

const getSignup = async (req, res) => {
  res.render('./pages/auth/signup');
};

const createSignup = async (req, res) => {
  passport.authenticate('local.signup', {
    successRedirect: '/profile', //m envia cuando todo este funcionando
    failureRediect: '/signup', // cuando falle m envia a signup
    failureFlash: true, //m envia msj cuando falle
  });
  res.send('recibio los datos');
};

const getProfile = async (req, res) => {
  res, send('HOLA soy profile');
};

module.exports = {
  getSignup,
  createSignup,
  getProfile,
  //   viewsSignup,
  //   deleteSignup,
  //   updateSignup,
  //   viewsEdit,
  //   editSignup,
};
