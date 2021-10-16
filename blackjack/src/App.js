import React from 'react';
import styled from 'styled-components'

import comprarCarta from './Componentes/comprarCarta';
import {ContainerPai} from './Componentes/styled'
import {DivdasCartas} from './Componentes/styled'
import {PagCartas} from './Componentes/styled'


let primeiraCartaUsuario 
let segundaCartaUsuario 
let primeiraCartaComputador 
let segundaCartaComputador 


class App extends React.Component {
  state = {
    cartasUsuario: [],
    cartasPC: [],
    paginaRenderizada: "inicial"
  }

  sorteioDeCartas = () => {
    primeiraCartaUsuario = comprarCarta()
    segundaCartaUsuario = comprarCarta()
    primeiraCartaComputador = comprarCarta()
    segundaCartaComputador = comprarCarta()

    while ((primeiraCartaUsuario.texto.includes("A") && segundaCartaUsuario.texto.includes("A")) || (primeiraCartaComputador.texto.includes("A") && segundaCartaComputador.texto.includes("A"))) {
      console.log ("Duas cartas 'As' para o mesmo jogador. As cartas serão redistribuidas.");
      primeiraCartaUsuario = comprarCarta()
      segundaCartaUsuario = comprarCarta()
      primeiraCartaComputador = comprarCarta()
      segundaCartaComputador = comprarCarta()
   
   }

   this.setState({
     cartasUsuario: [primeiraCartaUsuario, segundaCartaUsuario],
     cartasPC: [primeiraCartaComputador, segundaCartaComputador],
     paginaRenderizada: "sorteioCartas"
   })
  }

  paginaRenderizada = () => {
    switch (this.state.paginaRenderizada){
      case 'inicial':
        return this.paginaInicial()
      case 'sorteioCartas' :
        return this.paginaCartasSorteadas()
    }
  }

  paginaInicial = () => {
    return(
      <ContainerPai>
              
        <button onClick={this.sorteioDeCartas}>Começar Jogo!</button>
      </ContainerPai>
    )
  }

  paginaCartasSorteadas = () => {
    console.log("cu2", this.state.cartasUsuario)
    console.log("cpc2", this.state.cartasPC)


    const valorTotalUsuário = this.state.cartasUsuario.reduce((preVal, element) => preVal + element.valor, 0)


    return(
      <PagCartas>
        <DivdasCartas>
          <h3>Cartas do Usuário</h3>
          {this.state.cartasUsuario.map((iten)=>{
          return(
            <div>
              <p>{iten.texto}</p>
            </div>
            
          )
          })}
          <p>Valor Total = {valorTotalUsuário}</p>
        </DivdasCartas>

        <DivdasCartas>
          <h3>Cartas do Computador</h3>
          { this.state.cartasPC.length > 0 && <p>{this.state.cartasPC[0].texto}</p> }
        </DivdasCartas>

        <div className="opcoes">
          <h3>Deseja pegar mais uma carta?</h3>
          <div>
            <button>Sim</button>
            <button>Não</button>
          </div>  
        </div>
      </PagCartas>
    )

  }  
  render() {
    return (
      <ContainerPai>
        <div>
          <h1> Seja Bem-Vindo(a) ao <i>BlackJack!</i></h1>
        </div>
        {this.paginaRenderizada()}
        
      
        
      </ContainerPai>
    );
  }
  
}

export default App;
