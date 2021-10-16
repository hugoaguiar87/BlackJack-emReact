import styled from "styled-components"

export const ContainerPai = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;


`

export const DivdasCartas = styled.div`
    grid-row: 1/2;
    border: 1px solid black;
    width: 300px;
    justify-content: center;
    align-items: center;
    text-align: center;
`

export const PagCartas = styled.div `
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 10px;

    .opcoes, .perdeu {
        grid-column: 1/3;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;

        button{
            width: 90px;
            margin: 10px;
        }
    }
`