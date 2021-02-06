/* eslint-disable */
//criando a API própria com o arquivo JSON, feito com NEXT
import db from '../../db.json';



export default function dbHandler(request, response){
    //Aqui são configurações para deixar a API publica
    //essa configuração permite o browser sair da minha pagina(URL) e ir para outra com domínio diferente

    if(request.method ==='OPTIONS'){
        response.status(200).end();
        return;
    }
      response.setHeader('Access-Control-Allow-Credential', true);
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods','GET,OPTIONS,PATCH,DELETE,POST,PUT');


    response.json(db)


}