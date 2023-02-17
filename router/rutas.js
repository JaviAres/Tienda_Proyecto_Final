const express = require('express') 
const router = express.Router();


router.get('/', (req, res) => {
    res.render("index", { titulo: "mi titulo dinámico" })
})

router.get('/carrito', (req, res) => {
    res.render("carrito", { titulo: "mi titulo dinámico" })
})

module.exports = router;
