require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto')
    })
    .catch((e) => console.log(`algo deu errado ------- ${e}`)
);

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfErro, csrfMiddleware} = require('./src/middlewares/middleware');



app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOpitions = session({
    secret:'qualquer coisa',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave:false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24 * 7,
        httpOnly:true
    }
});

app.use(sessionOpitions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

// nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfErro)
app.use(csrfMiddleware)

app.use(routes);

app.on('pronto', () => {
    app.listen(8080, () => {
        console.log('http://localhost:8080')
        console.log('servidor executando na porta 8080');
    });
});

