const express = require('express');
const router = require('./routes.js');

const Contenedor = require('./contenedor');
let contenedor = new Contenedor('productos');
const app = express();

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", router);
app.use("/static", express.static(__dirname + "/public"));

app.use(errorHandler);
app.set('view engine','ejs');

app.get('/', function(req,res) {
    res.render('create', { });
});

app.get('/productos', async function(req,res) {
    let productList = await contenedor.getAll();
    res.render('list', { productList: productList });
});

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${port}`);
});

