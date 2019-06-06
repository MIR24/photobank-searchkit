```
docker run --name build -v "$PWD":/usr/src/app -w /usr/src/app node:4.7.2 sh docker-build.sh
```
or
```
docker run --name photobank-searchkit -v "$PWD":/usr/src/app -w /usr/src/app node:4.7.2 sh docker-run.sh
```
------------------

<h1>Docker updates</h1>

npm install -g tsd@0.6.5-beta.2
tsd install


<h3>docker-run.sh</h3>
```
#!/bin/bash  
#npm install -g npm  
#npm install -g tsd  
#tsd install  
npm install  
npm rebuild node-sass  
npm start  
```
