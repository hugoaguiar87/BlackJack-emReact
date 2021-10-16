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

  componentDidUpdate() {
    this.paginaCartasSorteadas()
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

  sortearNovaCarta = () => {
    let novaCartaComprada = comprarCarta()
    this.setState({cartasUsuario:[...this.state.cartasUsuario, novaCartaComprada]})
    console.log("foi ativado")  
  }

  jogadaDoPC = () => {
    this.setState({paginaRenderizada: "resultado"})
  }

  jogarNovamente = () => {
    this.setState({
      cartasUsuario: [],
      cartasPC: [],
      paginaRenderizada: "inicial"
    })
  }


  paginaRenderizada = () => {
    switch (this.state.paginaRenderizada){
      case 'inicial':
        return this.paginaInicial()
      case 'sorteioCartas' :
        return this.paginaCartasSorteadas()
      case 'resultado' :
        return this.paginaResultado()
    }
  }

  paginaInicial = () => {
    return(
      <ContainerPai>
        <a href="https://pt.wikipedia.org/wiki/Blackjack"><button>Regras</button></a>
        <button onClick={this.sorteioDeCartas}>Começar Jogo!</button>
      </ContainerPai>
    )
  }

  paginaCartasSorteadas = () => {
    console.log("cu2", this.state.cartasUsuario)
    const valorTotalUsuário = this.state.cartasUsuario.reduce((preVal, element) => preVal + element.valor, 0)
    const valorTotalPC = this.state.cartasPC.reduce((preVal , element)=> preVal + element.valor, 0)


    if(valorTotalUsuário <= 21) {
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
              <button onClick={this.sortearNovaCarta}>Sim</button>
              <button onClick={this.jogadaDoPC}>Não</button>
            </div>  
          </div>
        </PagCartas>
      )
    } else if (valorTotalUsuário > 21) {
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
            {this.state.cartasPC.map((iten)=>{
              return(
                <div>
                  <p>{iten.texto}</p>
                </div>
              
            )
            })}
            <p>Valor Total = {valorTotalPC}</p>

          </DivdasCartas>
  
          <div className="perdeu">
            <h1>VOCÊ PERDEU!</h1>
            <button onClick={this.jogarNovamente}>Jogar Novamente</button>
          </div>
        </PagCartas>
      )
    }
  }
  
  paginaResultado = () => {
    const valorTotalUsuário = this.state.cartasUsuario.reduce((preVal, element) => preVal + element.valor, 0)
    let valorTotalPC = this.state.cartasPC.reduce((preVal , element)=> preVal + element.valor, 0)
    console.log ("Fora loop", valorTotalPC)

    while (valorTotalPC < valorTotalUsuário) {
      let novaCartaPC = comprarCarta()
      this.state.cartasPC.push(novaCartaPC)
      valorTotalPC = this.state.cartasPC.reduce((preVal , element)=> preVal + element.valor, 0)
      console.log ("loop", valorTotalPC)


      if(valorTotalPC > 21) {
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
            {this.state.cartasPC.map((iten)=>{
              return(
                <div>
                  <p>{iten.texto}</p>
                </div>
              
            )
            })}
            <p>Valor Total = {valorTotalPC}</p>

          </DivdasCartas>
  
          <div className="perdeu">
            <h1>PARABÉNS! VOCÊ GANHOU!</h1>
            <button onClick={this.jogarNovamente}>Jogar Novamente</button>
          </div>
        </PagCartas>
        )
      }
    }

    if(valorTotalPC === valorTotalUsuário) {
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
          {this.state.cartasPC.map((iten)=>{
            return(
              <div>
                <p>{iten.texto}</p>
              </div>
            
          )
          })}
          <p>Valor Total = {valorTotalPC}</p>

        </DivdasCartas>

        <div className="perdeu">
          <h1>O JOGO TERMINOU EMPATADO!</h1>
          <button onClick={this.jogarNovamente}>Jogar Novamente</button>
        </div>
      </PagCartas>
      )
    }

    if (valorTotalUsuário < valorTotalPC){
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
          {this.state.cartasPC.map((iten)=>{
            return(
              <div>
                <p>{iten.texto}</p>
              </div>
            
          )
          })}
          <p>Valor Total = {valorTotalPC}</p>

        </DivdasCartas>

        <div className="perdeu">
          <h1>O COMPUTADOR VENCEU!</h1>
          <button onClick={this.jogarNovamente}>Jogar Novamente</button>
        </div>
      </PagCartas>
      )
    }
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
