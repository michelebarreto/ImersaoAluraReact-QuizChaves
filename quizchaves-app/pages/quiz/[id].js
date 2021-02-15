/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/components/screens/Quiz';

// configurações para o lado do servidor

export default function QuizDaGaleraPage({ dbExterno}) {
  
  return (
    <ThemeProvider theme ={dbExterno.theme}>
      <QuizScreen  externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
    
  );
}
//Funções que roda no servidor next
export async function getServerSideProps(context) {
 const [projectName, githubUser] =context.query.id.split('___');
 try{

 const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
  .then((respostaDoServer)=>{
    if(respostaDoServer.ok){
      return respostaDoServer.json();
    }
    throw new Error('Falha em pegar os dados');
  })
  .then((respostaConvertidaEmObjeto)=>{ return respostaConvertidaEmObjeto; })
  .catch((err)=>{

  });

  return {
    props:{
    dbExterno,
    },
  };
}catch(err){
  throw new Error(err);

}

 }