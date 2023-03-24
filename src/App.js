import axios from "axios";
import styled from "styled-components";

import React from "react";
import "./styles.css";

const Full = styled.div`
  background-image: url("../gilson-junior-render0005.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  font-family: Arial, Helvetica, sans-serif;
  /* border: solid green; 
  margin-bottom: 5rem;*/
`;

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b96bc0;
  border-radius: 5%;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 2em;
`;

const ItensContainer = styled.div`
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.8em;
`;

const API = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character"
});

export default class App extends React.Component {
  state = {
    info: []
  };
  //função que recebe uma promessa como resposta,de que alguma coisa deu certo
  pegarPersonagens = async () => {
    const resposta = await API.get();
    console.log(resposta);

    //mapear itens da API
    const itensApi = resposta.data.results.map((item) => {
      return {
        ...item //spread
      };
    });
    //Atualizando o estado com os itens da api
    this.setState({
      info: itensApi
    });
  };
  //pré-montando a função que pega a API
  componentDidMount() {
    this.pegarPersonagens();
  }

  render() {
    return (
      <Full>
        <div className="navigationCon">
          <h1>Página com tema de Rick and Morty</h1>
        </div>
        <ItensContainer>
          {this.state.info.map((item) => (
            <FullContainer>
              <h2>{item.name}</h2>
              <div>
                <img src={item.image} alt={item.name} />
                <h3> Species:</h3>
                <h3> {item.species} </h3>
                <Paragraph> {item.status} </Paragraph>
              </div>
            </FullContainer>
          ))}
        </ItensContainer>
        <div className="descriptionCon">
          <p>
            96% gostaram, dos que assistiram e deram nota, desse programa de TV
            Usuários do Google Acompanhe malucas viagens no tempo-espaço e por
            universos paralelos com Rick, <br /> um cientista com problemas com
            a bebida, e seu neto Morty, um adolescente não tão brilhante quanto
            o avô.
          </p>
        </div>
      </Full>
    );
  }
}
