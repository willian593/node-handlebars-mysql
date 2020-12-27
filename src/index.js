require('dotenv').config(); // importante para usar .env
const { database } = require('./keys');
const exphbs = require('express-handlebars'); // motor de plantilla
const express = require('express');
const morgan = require('morgan'); // es como los cors
const path = require('path');
// const pool = require('../src/database');
const flash = require('connect-flash');
const session = require('express-session'); // almacena datos en la memoria del service
const MySQLStore = require('express-mysql-session'); // almacena en BD
const passport = require('passport');

/*
=====================================
            Inicializacion
=====================================
*/
const app = express();
require('./lib/passport');

/*
=====================================
            MIDDLEWARES
=====================================
*/
app.use(morgan('dev')); // nuestra por consola las peticiones q van llegando
app.use(
  session({
    secret: 'ronaldx', //comienza guardando la seccion (msj)
    resave: false, // no se renueva la seccion
    saveUninitialized: false, // no s vuelva establecer la seccion
    store: new MySQLStore(database), // donde s guarda la seccion en BD
  })
);
app.use(flash()); //sirve para poder enviar (msj)
app.use(express.urlencoded({ extended: false })); // aceptar los datos q envia el usuario por formulario
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
// ==================================

/*
=====================================
       GLOBAL VARIABLES
=====================================
*/
app.use((req, res, next) => {
  /*
  q da disponible success para usar 
  en todas las vistas (msj)
  */
  app.locals.success = req.flash('success');
  next();
});
// ==================================

/*
=====================================
            ROUTES
=====================================
*/
app.use(require('./routes'));
app.use('/links', require('./routes/links'));
app.use('/signup', require('./routes/authentication'));

//===================================

/*
=====================================
            PUBLIC
=====================================
*/
app.use(express.static(path.join(__dirname, 'public')));
//===================================

/*
=====================================
        MOTOR DE PLANTILLA
=====================================
*/

app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
  })
);
app.set('view engine', '.hbs'); // utilizar el motor de plantilla

//===================================

/*
=====================================
       CONECTION service
=====================================
*/

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
//==================================
