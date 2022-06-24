const db = require('../database');

module.exports = {

  pegarTodosUsuarios: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Usuario', (error, results) => {
        if (error) { reject(error); return; }
        resolve(results);
      })
    });
  },
  
  pegarUsuarioPorLogin: (login) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Usuario WHERE login = ?', [login], (error, results) => {
        if (error) { reject(error); return; }
        if ( results.length > 0 ) { resolve(results[0]); }
        else { resolve(false); }
      })
    });
  },

  criarUsuario: (login, senha, nome) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Usuario (login, senha, nome) VALUES (?, ?, ?)', [login, senha, nome], 
      (error, results) => {
        if (error) { 
          reject(error); return; 
        }
        resolve(results.insertId);
      })
    }); 
  },

  atualizarUsuario: (login, senha, nome) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Usuario SET senha = ?, nome = ? WHERE login = ?', [senha, nome, login], 
      (error, results) => {
        if (error) { 
          reject(error); return; 
        }
        resolve(results);
      })
    });
  },

  deletarUsuario: (login) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Usuario WHERE login = ?', [login], 
      (error, results) => {
        if (error) { 
          reject(error); return; 
        }
        resolve(results);
      });
    });
  }
};