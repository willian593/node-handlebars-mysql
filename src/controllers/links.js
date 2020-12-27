const { response } = require('express');
const pool = require('../database');
/*
=====================================
        PAGINA AGREGAR LINK
=====================================
*/

const getLinks = async (req, res) => {
  res.render('./pages/links/add');
};

const createLinks = async (req, res = response) => {
  const { title, url, description } = req.body;

  const newLink = {
    title,
    url,
    description,
  };
  await pool.query('INSERT INTO links set ?', [newLink]); //save BD MYSQL
  req.flash('success', 'link saved successfully'); // flash.- Para enviar msj
  res.redirect('/links');
};
/*
=====================================
        PAGINA LISTA DE LINKS
=====================================
*/
const viewsLinks = async (req, res = response) => {
  const links = await pool.query('SELECT * FROM links'); // call BD
  res.render('./pages/links/list', { links });
};

const deleteLinks = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM links WHERE ID = ?', [id]);
  req.flash('success', 'Link removed success');
  res.redirect('/links');
};

/*
=====================================
         PAGINA EDITAR LINK
=====================================
*/
const viewsEdit = async (req, res = response) => {
  const links = await pool.query('SELECT * FROM links');
  res.render('./pages/links/edit');
};

const editLinks = async (req, res) => {
  const { id } = req.params;
  const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
  res.render('./pages/links/edit', { link: links[0] }); // links[0].- para ver un objeto
};

const updateLinks = async (req, res = response) => {
  const { title, url, description } = req.body;
  const { id } = req.params;

  const newLink = {
    title,
    url,
    description,
  };
  await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]); //ACTUALIZAR BD MYSQL
  req.flash('success', 'Link updated success');
  res.redirect('/links');
};

module.exports = {
  getLinks,
  createLinks,
  viewsLinks,
  deleteLinks,
  updateLinks,
  viewsEdit,
  editLinks,
};
