/*
Rutas: /signup
 */
const { Router } = require('express');
const router = Router();
const {
  getSignup,
  createSignup,
  getProfile,
  // viewsSignup,
  // updateSignup,
  // deleteSignup,
  // editSignup,
} = require('../controllers/authemtication');

/*
=====================================
          PAGINA Signup
=====================================
*/
router.get('/', getSignup); //Render Formulario
router.post('/', createSignup); //recibir datos del Formulario
router.get('/profile', getProfile); //recibir datos del Formulario

module.exports = router;
