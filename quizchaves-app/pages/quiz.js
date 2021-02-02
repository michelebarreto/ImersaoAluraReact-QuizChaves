/* eslint-disable */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, totalQuestions, questionIndex,onSubmit }){
  const questionId =`question_ ${questionIndex}`;
  return(
    <Widget>
    <Widget.Header>
    <h3> {`Pergunta ${questionIndex +1} de ${totalQuestions}`}</h3>
    </Widget.Header>
    <img alt="descrição" style={{width:'110%',height:'220px', objectFit:'cover',}}
    src = {question.image}/>
    <Widget.Content>
    {/* aqui esta pegando as questões do arquivo db.JSON*/ }
    <h2> {question.title}   </h2>
    <p>  {question.description}    </p>

    <form onSubmit={(infosDoEvento)=>{
      infosDoEvento.preventDefault();
      onSubmit();

    }}> 
     {question.alternatives.map((alternative, alternativeIndex)=>{
       const alternativeId =`alternative_ ${alternativeIndex}`;

     return (
        <Widget.Topic as="label"
         htmlFor = {alternativeId}>

       <input
        id={alternativeId} 
       name= {questionId}
       type="radio" />
       {alternative}
       </Widget.Topic>
     );     
     })}
     
    <Button type="submit">Confirmar
    
    </Button>
    </form>
    </Widget.Content>
  </Widget>
  );
}
const screenStates ={
QUIZ:'QUIZ',
LOADING:'LOADING',
RESULT:'RESULT',
};

export default function QuizPage(){
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setcurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  {/**Fases do react ou Efeitos React || Effects
   nasce === didMount
   atualiza === willUpdate
   morre === willUnmount
   */}
  React.useEffect(()=>{
  setTimeout(()=>{
  setScreenState(screenStates.QUIZ);

  },1 *1000);//tempo de carregamento da página

  }, []);
  
 function handleSubmitQuiz(){
   const nextQuestion =questionIndex +1;
   if (nextQuestion < totalQuestions){
     setcurrentQuestion(nextQuestion);

   }else{
     setScreenState(screenStates.RESULT);
   }
  }


  return(
    <QuizBackground backgroundImage={db.bg}>
    <QuizContainer>
    <QuizLogo />
    {/**Essa configuração é para aparecer a pagina carregando antes de começar o jogo */}
    {screenState === screenStates.QUIZ && (
    <QuestionWidget
    /**aqui é o componente que se refere ao quis das perguntas no db.JSON */
    question ={question}
    questionIndex={questionIndex}
    totalQuestions={totalQuestions}
    onSubmit={handleSubmitQuiz}
    />
   )}
   {/** aqui basicamente quer dizer que,o que está na direita não será executado até o dar esquerda for verdadeiro
   ou seja só aparece a frase de você acertou, quando o resultado for executado */}
   {screenState === screenStates.LOADING && <LoadingWidget/>}
   
   {screenState === screenStates.RESULT && <div>Você acertou x questões, Parabéns !</div>}
    </QuizContainer>
  </QuizBackground>
  );
}