import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from'../src/components/QuizBackground'




//Aqui está colocando a imagem de fundo do quiz e configurando
//const BackgroundImage = styled.div`
//background-image:url(${db.bg});
//flex:1;
//background-size: cover;
//background-position:center;

//`;
// Aqui esta inserindo os container da Home do Quiz
export const QuizContainer= styled.div`
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
//Aqui é toda a montagem com os componentes para o Home
return (
  <QuizBackground backgroundImage={db.bg}>  
    <QuizContainer>
    <Widget>
    <Widget.Header>
    <h1>Quiz do Chaves</h1>
    </Widget.Header>
    <Widget.Content>
    <p>Será que você conhece o Chaves ? </p>
    
    </Widget.Content>
    </Widget>
    <Widget>
      <h1>Quizes da Galera</h1>
    <Widget.Content>

      <p>Quizes que estão bombando !</p>
      </Widget.Content>
    </Widget>
    <Footer />
    </QuizContainer> 
    <GitHubCorner projectUrl="https://github.com/michelebarreto" />
  
  </QuizBackground>
)
};

