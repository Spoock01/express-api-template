# **Express Api Template**

Este template pode ser utilizado para facilitar a criação de APIs utilizando express.

<hr>

## **Features**

- Disponibilidade em Windows e Linux
- Tratamento global de exceções
- Criação de endpoints com criação de um único arquivo
- Conexão com o mongo
- Middlewares para exibição de respostas de erro e sucesso

<hr>

## **Bibliotecas utilizadas**

Este template faz uso das seguintes bibliotecas:


#### Tratamento de variáveis de ambiente:

- [dotenv](https://www.npmjs.com/package/dotenv)
- [cross-env](https://www.npmjs.com/package/cross-env)

#### Logger:

- [chalk](https://www.npmjs.com/package/chalk)
- [morgan](https://www.npmjs.com/package/morgan)

#### Gerais:

- [cors](https://www.npmjs.com/package/cors)
- [express](https://www.npmjs.com/package/express)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [helmet](https://www.npmjs.com/package/helmet)
- [joi](https://www.npmjs.com/package/joi)
- [moment](https://www.npmjs.com/package/moment)
- [mongoose](https://www.npmjs.com/package/mongoose)

<hr>

## **Instalação**

É necessário ter o [node](https://nodejs.org/en/) instalado. Além disso, para utilizar o [mongodb](https://docs.mongodb.com/manual/installation/) localmente, também é necessário que ele seja instalado.

Após clonar este repositório, instale as dependências e inicie o servidor.

```
npm install
npm start
```

<hr>

## **Como usar**

#### **Criando novos endpoints:**

Todos os novos endpoints deve estar dentro da pasta ```controllers```. Para que esse endpoint seja reconhecido, é necessário que qualquer arquivo dentro desta pasta retorne um objeto da seguinte forma:

```
export default {
	BASE_PATH: '/base-path',
	MIDDLEWARE: [middlewareFunction],
	GET: [
		createRoute('/endpointName', endpointFunction),
	],
    POST: [
      createRoute('/example', exampleFunction),
    ]
};
```

- BASE_PATH: Quando definido, todos os endpoints definidos nesse arquivo terão esse valor. Com os dados mostrados acima teremos o seguinte resultado: **GET ```.../base-path/endpointName```** e **POST ```.../base-path/example```**
- MIDDLEWARE: Quando definido, irá incluir todas as funções dentro do array como middleware para todas as rotas. Com os dados acima, a função ```middlewareFunction``` será executada **SEMPRE** que ```.../base-path/endpointName``` e ```.../base-path/example``` sejam chamados.
- (GET, POST, PUT...): Deve **sempre** receber um array e **sempre** fazer uso da função ```createRoute```.


Para utilizar a função ```createRoute```, esta deve ser importada do arquivo ```src\utils\RouteCreator```.


**Definição:**

```createRoute(pathName, fn, middlewares)```

**Argumentos:**

pathName(String): Nome do endpoint   
fn(Function): Função de processamento do endpoint   
middlewares(Array): Array de funções(middlewares) que serão executadas antes de ```fn```.

#### **Tratamento de erros:**

As seguintes exceções estão disponíveis:

- BadRequestException (400)
- ValidationErrorException (400)
- UnauthorizedExceptionException (401)
- ForbiddenException (403)
- NotFoundException (404)
- UnprocessableEntityException (422)
- ServiceUnavailableException (503)

**Todas** as exceções indicadas acima seguem a seguinte definição:

**Definição**:

new BadRequestException(message, errors)

**Argumentos**:

message(String): Mensagem personalizada do erro
errors(Array): Array com uma lista de erros

Para retornar um erro para o cliente, os seguintes comandos podem ser utilizado:

Enviando exceção:   

```throw new BadRequestException('Message')```

Resultado:
```
{
    "timestamp": "December 5th 2020, 11:26:57 am",
    "statusCode": 400,
    "method": "GET",
    "path": "/api/exception/bad-request",
    "message": "Message"
}
```


Enviando exceção:
```
throw new BadRequestException(
  'Message', [
		{ err: 'error' },
		{ err: 'error2'},
	]
);
```

Resultado:
```
{
    "timestamp": "December 5th 2020, 11:27:52 am",
    "statusCode": 400,
    "method": "GET",
    "path": "/api/exception/bad-request",
    "message": "Message",
    "errors": [
        {
            "err": "error"
        },
        {
            "err": "error2"
        }
    ]
}
```


OBS: Este comando envia uma resposta direto para o cliente e a execução da função é finalizada. É necessário ficar atento para o uso deste comando dentro de um try/catch. Exceções que são tratadas com o try/catch não irão ser enviadas como resposta.

Exemplo OK de resposta:

```
if(name === null){
  throw new BadRequestException("Name cannot be null.");
}
```

Exemplo de resposta não enviada:
```
try{
  if(name === null){
    throw new BadRequestException("Name cannot be null.");
  }
}catch(error){
  console.error(error.message);
}
```

Não é necessário uso de try/catch para todas as validações. Por padrão, todo erro não tratado irá retornar a seguinte resposta:

```
{
    "timestamp": "December 5th 2020, 11:05:31 am",
    "statusCode": 500,
    "method": "GET",
    "path": "/api/exception/bad-request",
    "message": "Internal Server Error"
}
```


#### **Variáveis de ambiente:**

Para utilizar variáveis de ambiente, basta incluí-las no arquivo ```.env.dev``` na pasta ```src\environment```.
Para resgatar as variáveis, basta importar o objeto ```env``` do arquivo ```src\environment\Environment```;

Exemplo:

```
import env from 'src\environment\Environment';

console.log(env.PORT);
```

#### **Informações gerais:**

É possível definir um valor base para todas as rotas da API. Para modificar, basta modificar o valor da seguinte variável de ambiente: ```API_BASE_PATH```.

Também é possível definir quais verbos serão permitidos. Para modificar, basta incluir ou remover valores da lista ```allowedVerbs``` que se encontra no arquivo ```src\config\ServerConfiguration```. Por padrão, os seguintes verbos estão disponíveis: POST, GET, PUT, DELETE.


[comment]: <> (Incluir uso de funções globais)