import './Usuario.css';
import React from 'react';
import axios from 'axios';
import Main from '../../templates/Main';

const headerProps = {
  title: 'Usuários',
  subtitle: 'Cadastro'
}

const initialUrl = 'http://localhost:3000/api/usuarios/';
const actionUrl = 'http://localhost:3000/api/usuario/';

export default class Usuario extends React.Component {

  constructor() { 
    super();

    this.state = {
      usuario: { login: '', senha: '', nome: ''},
      list: []
    };
  }

  componentWillMount = () => {
    axios(initialUrl).then(resp => {
      this.setState({ list: resp.data.result });
    });      
  } 

  getUpdatedList = (usuario, add = true) => {
    const list = this.state.list.filter(e => e.login !== usuario.login);

    if (add) { list.unshift(usuario); };
    return list;  
  }  

  saveOrUpdate = () => {
    const usuario = this.state.usuario;
    const method = usuario.login ? 'put' : 'post';
    const url = usuario.login ? `${actionUrl}${usuario.login}` : actionUrl;

    console.log(method, url)

    axios[method](url, usuario).then(resp => {
      const list = this.getUpdatedList(resp.data);
      setTimeout(this.setState({ usuario: this.state.usuario, list }));
    });
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  delete = usuario => {
    axios.delete(`${actionUrl}${usuario.login}`).then(resp => {
      const list = this.getUpdatedList(usuario, false);
      this.setState({ list });
    });
  }

  load = usuario => { this.setState({ usuario }); }

  clear = () => { this.setState({ usuario: this.state.usuario }); }

  updateField = event => {
    const usuario = { ...this.state.usuario };

    usuario[event.target.title] = event.target.value;

    this.setState({ usuario });
  }

  renderForm = () => {
    return (
      <div className="form">
        
        <div className="row">
          
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label>Login</label>
              <input type="text" className="form-control" 
                title="login" value={this.state.usuario.login}
                onChange={e => this.updateField(e)}
                placeholder="Login..." />
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="form-group">
              <label>Senha</label>
              <input type="text" className="form-control" 
                title="senha" value={this.state.usuario.senha}
                onChange={e => this.updateField(e)}
                placeholder="Senha..." />
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" className="form-control" 
                title="nome" value={this.state.usuario.nome}
                onChange={e => this.updateField(e)}
                placeholder="Nome..." />
            </div>
          </div>

        </div>
        <hr />

        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button type="submit" onClick={ e => this.saveOrUpdate(e) } className="btn btn-primary">
              Salvar
            </button>
            <button type="submit" onClick={ e => this.clear(e) } className="btn btn-secondary ml-2">
              Cancelar
            </button>
          </div>
        </div>

      </div>
    );
  } 
    
  renderTable = () => {
    return (
      <table className="table mt-4">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Login</th>
            <th>Senha</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {this.state.list && this.state.list.map(usuario => {
            return (
              <tr style={{ textAlign: "center" }} key={usuario.login}>
                <td>{usuario.login}</td>
                <td>{usuario.senha}</td>
                <td>{usuario.nome}</td>
                
                <td className='actions-buttons'>

                  <button className="btn btn-warning" onClick={() => {this.load(usuario);}}>
                    <i className="fa fa-pencil"></i>
                  </button>

                  <button className="btn btn-danger ml-2" onClick={() => {this.delete(usuario);}}>
                    <i className="fa fa-trash"></i>
                  </button>

                </td> 
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }       

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()} 
      </Main>
    );
  } 

}
