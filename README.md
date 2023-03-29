# Shaw and Partners test

To start this project, it is necessary to install the dependencies, which will be used in the tests. So use the command below to install such dependencies:

````
yarn install
````
<br>

With that done, to run your application, just use the command
````
yarn dev
````
<br> 
# **About the routes**


````
Route User :
POST: /user - {Parametros: name(tipo string), email(tipo string), phoneNumber(tipo number), password(tipo string)}
POST: /user/login - {Parametros: email(tipo string), password(tipo string)}
GET: /user/:id - {URL parametro => :id(O parametro ":id" é o id de quem você quer verificar os contatos)}
GET: /user/ - {Token de autorização necessario para trazer as informações do usuario logado}
````
````
Route Contact :
POST: /contact/:id - {URL parametro => :id(O parametro ":id" é o id de quem você quer cadastrar como contato), Token de autorização é o token da pessoa
que irá realizar o cadastro de um contato}
````
<br>

# **About the tests**

This application has tests, which will be used to validate if all business rules were applied correctly.

The tests are located in `src/__tests__`.

In the `integration` subfolder are the tests.

In the `jest.config.json` file are some necessary settings for the tests to run.

**`Do not alter any of these files in any way.`** This could compromise the integrity of the tests.

Also, don't change the `test` script located in `package.json`. This will be used to run the tests.

<br>


# **Running the tests** 

To run the tests it is necessary that in your terminal, you are inside the project directory.

Once you are in the terminal and within the correct path, you can use the following commands:

### Run all tests
````
yarn test
````


<br>


**In case you want to check all test execution options, visit the [Official Jest Documentation](https://jestjs.io/docs/cli)**

After running one of the commands, a log will appear in your terminal, containing the test execution information.

**Note:** The test may take a few seconds to complete. The larger the test, the more time it takes to run.

#
