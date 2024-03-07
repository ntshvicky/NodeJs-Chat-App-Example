# step
1. create server.js file
2. setup node using npm init --yes (yes to prevent step one by one)
3. install express to use frontend also - npm install -s express
4. install nodemon to run express - npm install -g nodemon
5. run server.js using nodemon to see in browser - nodemon server.js - then you can access localhost:3000 in browser
6. install body-parser - it required to see request data in server side send by post method - npm install -s body-parser
7. for socket.io - npm install -s socket.io
8. for mongodb use - npm install -s mongoose (in new mongoose version..callback doesnt support )
9. install jasmine to handle unit test - npm install --save-dev jasmine (--save-dev only gonna available on development mode)
10. to create testing folder and some config for testing use - ./node_modules/.bin/jasmin init
    it will create spec folder
    now update package.json script array for test key
    write test code in spec/server.spec.js
11. install request to send request - npm install -s request


## here i have also used some example for basic queries to access
like how to access URL parameter and query string