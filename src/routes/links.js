/*
Rutas: /links
 */
const { Router } = require('express');
const router = Router();
const {
  getLinks,
  createLinks,
  viewsLinks,
  updateLinks,
  deleteLinks,
  viewsEdit,
  editLinks,
} = require('../controllers/links');

/*
=====================================
          PAGINA AGREGAR LINK
=====================================
*/
router.get('/add', getLinks); // muestra la pantalla para crear links
router.post('/add', createLinks); // crear links

/*
=====================================
          PAGINA LISTA DE LINKS
=====================================
*/

router.get('/', viewsLinks); // muestra los links creados
router.get('/delete/:id', deleteLinks); // Eliminar links

/*
=====================================
          PAGINA EDITAR LINK
=====================================
*/
// router.get('/edit', viewsEdit); // mostar page
router.get('/edit/:id', editLinks); // editar links
router.post('/edit/:id', updateLinks); // actualizar links

module.exports = router;
