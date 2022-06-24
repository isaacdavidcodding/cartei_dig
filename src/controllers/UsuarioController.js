const UsuarioService = require('../services/UsuarioService');

module.exports = {

  pegarTodos: async (req, res) => {
    let answer = { error:'', result:[] };
    let usu = await UsuarioService.pegarTodosUsuarios();

    for ( let i in usu ) {
      answer.result.push({
        login: usu[i].login,
        senha: usu[i].senha,
        nome: usu[i].nome
      });
    }  

    res.json(answer);
  },

  pegarUm: async (req, res) => {
    let answer = { error:'', result:{} };

    let login = req.params.login;
    let usu = await UsuarioService.pegarUsuarioPorLogin(login);

    if (usu) { answer.result = usu; }

    res.json(answer);
  },

  postarUm: async (req, res) => {
    let answer = { error:'', result:{} };

    let login = req.body.login;
    let senha = req.body.senha;
    let nome = req.body.nome;

    if ( login && senha && nome ) {
      let keyReturned = await UsuarioService.criarUsuario(login, senha, nome);
      answer.result = { key: keyReturned, login, senha, nome };
    } else { answer.error = 'A informação não foi enviada'; }

    res.json(answer);
  }, 

  editarUm: async (req, res) => {
    let answer = { error:'', result:{} };

    let login = req.params.login;
    let senha = req.body.senha;
    let nome = req.body.nome;

    if ( login && senha && nome ) {
      let keyReturned = await UsuarioService.atualizarUsuario(login, senha, nome);
      answer.result = { key: keyReturned, login, senha, nome };
    } else { answer.error = 'A informação não foi enviada'; }

    res.json(req.body);
  },

  dellUm: async (req, res) => {
    let answer = { error:'', result:{} };  
    await UsuarioService.deletarUsuario(req.params.login);
    res.json(answer);
  }
};