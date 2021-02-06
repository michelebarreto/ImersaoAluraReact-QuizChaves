/* eslint-disable */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';


function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Seu Resultado :
      </Widget.Header>
   {/** Organização para mostrar o placar final */}
      <Widget.Content>
        <p> Você acertou
        {' '}

        {results.filter((x)=>x).length}

        {' '}
        perguntas !
        </p>

       <ul>
       {results.map((result, index)=>(
       <li key={`result_ ${result}`}>  # 
       {index + 1}
       {' '}
        Resultado :
       {result === true 
       ? ' Acertou ' 
       : ' Errou '}
       </li>
              
       ))}    
       </ul>
       
      </Widget.Content>
    </Widget>
  );
}

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

function QuestionWidget({ question, totalQuestions, questionIndex,onSubmit,addResult }){
  // const de estado inicial indefinido
  const [selectedAlternative, setSelectedAlternative]= React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited]= React.useState(false);//essa const e para declara um tempo de sinalizar resposta certa e ir para proxima pergunta
  const questionId =`question_ ${questionIndex}`;
  const hasAlternativeSelected = selectedAlternative !== undefined;//essa const é para não aceitar clicar no botão de cofirmar sem marcar uma alternativa
  const isCorrect = selectedAlternative === question.answer;//aqui é a const para informar quando acertar a resposta o answer é onde está informando a resposta correta no arquivo db.JSON
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
    <p>  {question.description} </p>

    <AlternativesForm onSubmit={(infosDoEvento)=>{
      infosDoEvento.preventDefault();
      setIsQuestionSubmited(true);
      // tempo para mudar a questão
      setTimeout(()=>{
        addResult(isCorrect);
        setIsQuestionSubmited(false);
        setSelectedAlternative(undefined);
        onSubmit();

      },3 *1000);

    }}> 
     {question.alternatives.map((alternative, alternativeIndex)=>{
       const alternativeId =`alternative_ ${alternativeIndex}`;
       const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
       const isSelected =selectedAlternative === alternativeIndex;

     return (
        <Widget.Topic as="label"
        key={alternativeId}
        htmlFor = {alternativeId}
        data-selected={isSelected}
        data-status={isQuestionSubmited && alternativeStatus}
        >

       <input
        id={alternativeId} 
       name= {questionId}
       onChange={()=> setSelectedAlternative(alternativeIndex)}//aqui vai indicar se a resposta do usuário esta correta
       type="radio" />
       {alternative}
       </Widget.Topic>
     );     
     })}
     
    <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
     {/**mensagem para o usuário de acerto das questões */}
    {isQuestionSubmited && isCorrect && <p>Isso, isso, isso *Você acertou!</p>}
    {isQuestionSubmited && !isCorrect && <p>Que burro, da zero pra ele ! *Você errou!</p>}

    </AlternativesForm>
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
  const [results, setResults]= React.useState([]);//essa const é para captair a quantidade de resposta certa e errada
  const totalQuestions = db.questions.length;
  const [currentQuestion, setcurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  // Somando os resultados

  function addResult(result){
    setResults([
      ...results,
      result,
    ]);
  }

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
    addResult={addResult}
    />
   )}
   {/** aqui basicamente quer dizer que,o que está na direita não será executado até o dar esquerda for verdadeiro
   ou seja só aparece a frase de você acertou, quando o resultado for executado */}
   {screenState === screenStates.LOADING && <LoadingWidget/>}
   
   {screenState === screenStates.RESULT && <ResultWidget results={results} />}
    </QuizContainer>
  </QuizBackground>
  );
}