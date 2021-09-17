import React from "react";

export class SorteioCartas extends React.Component {
    teste = () => {
        console.log('importado')
    }
    render() {
        return(
            <div>
                {this.teste}
                <h3> As Cartas foram sorteadas!</h3>


            </div>
        )
    }
}