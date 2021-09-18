import React from 'react';
import styled from 'styled-components'
import {SorteioCartas} from './Componentes/sorteioCartas.js'

const ContainerPai = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class App extends React.Component {
  
  
  render() {
    return (
      <ContainerPai>
        <div>
          <h1> Seja Bem-Vindo(a) ao <i>BlackJack!</i></h1>
        </div>        
        <button>Começar Jogo!</button>
        <SorteioCartas/>

      </ContainerPai>
    );
  }
  
}

export default App;
