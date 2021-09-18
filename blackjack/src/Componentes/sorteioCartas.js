import React from "react";
import styled from "styled-components";
import comprarCarta from './comprarCarta'


const CartasComputador = styled.div`
    border: 3px solid black;
    text-align: center;
    padding: 10px;
`  

const CartasJogador = styled.div `
    border: 3px solid black;
    text-align: center;
    padding: 10px;
`

const Cartas = styled.div `
    display: flex;
    column-gap: 10px;
`

export class SorteioCartas extends React.Component {
    state = {
        cartasIniciaisComputador: false,
        primeiraCartaComputador: [],
        cartasComputador: [],
        cartasIniciaisJogador: false,
        cartasJogador: [],
        valorTotalCartasJogador: ""
        
    }

   
    somatorioValorCartasJogador = () => {
        const arrayValoresCartasJogador = this.state.cartasJogador.map(iten => {
            return iten.valor
        })
        
        let valorCartasJogador = 0
        for (let i =0; i < arrayValoresCartasJogador.length(); i++ ) {
            valorCartasJogador = valorCartasJogador + arrayValoresCartasJogador[i]
            
        }

        console.log (valorCartasJogador)

        this.setState ({valorTotalCartasJogador: valorCartasJogador})

    }
   



    render() {
        if(!this.state.cartasIniciaisComputador){
            const cartaNova = comprarCarta()
            const cartaNova2 = comprarCarta()
            this.setState ({
                cartasComputador: [...this.state.cartasComputador, cartaNova, cartaNova2 ], 
                cartasIniciaisComputador: true,
                primeiraCartaComputador: [...this.state.primeiraCartaComputador, cartaNova]                
            })
        }

        if(!this.state.cartasIniciaisJogador) {
            const cartaNova = comprarCarta()
            const cartaNova2 = comprarCarta()
            this.setState({
                cartasJogador: [...this.state.cartasJogador, cartaNova,cartaNova2],
                cartasIniciaisJogador: true
            })
        }


        
      
        return(
            <div>
                
                <h3> As Cartas foram distribuídas!</h3>
                <Cartas>
                    <CartasComputador>
                        
                        <p>Cartas do Computador</p>
                        {this.state.primeiraCartaComputador.map((iten,indice) =>{
                            return <p key={indice}>{iten.texto}</p>
                            
                        })}
                        

                    </CartasComputador>

                    <CartasJogador> 
                        <p>Cartas do Jogador</p>
                        {this.state.cartasJogador.map((iten,index) => {
                            return <p key= {index}> {iten.texto}</p>
                        })}
                        
                        <p> Valor Total Cartas = {this.state.valorTotalCartasJogador} </p>
                    </CartasJogador>
                </Cartas>



            </div>
        )
    }
}