// desabilitando o eslint
/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head'; // aqui é do next
import { useRouter } from 'next/router';// aqui é do next

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

// Aqui está colocando a imagem de fundo do quiz e configurando
// const BackgroundImage = styled.div`
// background-image:url(${db.bg});
// flex:1;
// background-size: cover;
// background-position:center;
// `;

// Aqui esta inserindo os container da Home do Quiz
 const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');// aqui é o estado inicial no state,cria um array
// Aqui é toda a montagem com os componentes para o Home
// eslint-disable-next-line indent
return (

  <QuizBackground backgroundImage={db.bg}>
    <Head>
      {/** Aqui é o nome titulo que aparece no browser */}
      <title>Chaves Quiz</title>
    </Head>
    <QuizContainer>
      <QuizLogo/>
      <Widget>
        <Widget.Header>
          <h1> Quiz do Chaves</h1>
        </Widget.Header>
        <Widget.Content>
        <form onSubmit={function (infosDoEvento){
          infosDoEvento.preventDefault();
          // Aqui estamos criando as rotas buscando o nome do jogadores
          // o nome que o jogador digitar
          router.push(`/quiz?name=${name}`);
        } }
          // o router vai enviar os dados para a próxima pagina
        >
          <Input
            name="nomeDoUsuario"
            onChange={(infosDoEvento) => {
            // Mudança do estado do componente
           setName(infosDoEvento.target.value);
          }} placeholder=" Escreve ai seu nome 🤪 "
            value={ name }
          />
          <Button type="submit" disabled={name.length === 0}>
           {`Jogar ${name}`}
           </Button>
        </form>
        </Widget.Content>
      </Widget>
      <Widget>
       <Widget.Content>
          <p>Quizes que estão bombando !</p>
          <h2>Quizes da Galera</h2>
        {/**Aqui está pegando o link da API de outros jogos para mostra na tela */}
        <ul>
        {db.external.map((linkExterno)=> {
          const [projectName,githubUser] = linkExterno
          .replace(/\//g,'')
          .replace('https:', '')
          .replace('.vercel.app', '')
          .split('.');
          return (
            <li key={linkExterno}>
            <Widget.Topic 
            href={`/quiz/${projectName}___${githubUser}`}>
            {`${githubUser}/${projectName}`}
            </Widget.Topic>
            </li>
          );
        })}     
        </ul>
        </Widget.Content>
      </Widget>
      <Footer />
    </QuizContainer>
    <GitHubCorner projectUrl="https://github.com/michelebarreto" />
  </QuizBackground>
);
}
