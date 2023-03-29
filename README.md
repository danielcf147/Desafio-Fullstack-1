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
Route /api/users/:number :
GET: /api/users/:number - {URL parameter => :number(The ":number" parameter means the user's creation order. when passing a number, all users created after that number will be returned from the API)} 
````
````
Route /users/:username/details :
GET: /api/users/:username/details - {URL parameter => :username(The ":username" parameter means the user's username from github, this API will return all public information about the userI)} 
````
````
Route /users/:username/repos :
GET: /api/users/:username/repos - {URL parameter => :username(The ":username" parameter means the user's username from github, this API will return all public repositories from the userI)} 
````
<br>

# **API Render URL**

````
https://shawandpartnersapi.onrender.com
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
