const express = require('express');
const router = express.Router();

router.get('/carrito', (req, res) => {
    res.render('carrito'); //nueva vista que llamaremos Crear
 })

 module.exports = router;