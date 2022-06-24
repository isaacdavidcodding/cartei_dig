import React from 'react';

import Main from '../../templates/Main';

const Home = (props) => {
  return (
    <Main>
      <div className="display-4">Lista de transações feitas!</div>
      <hr />
      <p className="mb-0">Tabela com detalhes.</p>  
    </Main>
  );
}
  
export default Home;
