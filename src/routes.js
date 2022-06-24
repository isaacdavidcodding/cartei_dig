const express = require('express');
const router = express.Router();
const UsuarioController = require('./controllers/UsuarioController');

router.get('/usuarios', UsuarioController.pegarTodos);
router.get('/usuario/:login', UsuarioController.pegarUm);
router.post('/usuario', UsuarioController.postarUm);
router.put('/usuario/:login', UsuarioController.editarUm);
router.delete('/usuario/:login', UsuarioController.dellUm);

module.exports = router;