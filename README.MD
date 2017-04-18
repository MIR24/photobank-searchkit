```
docker run --name build -v "$PWD":/usr/src/app -w /usr/src/app node:4.7.2 sh docker-build.sh
```
or
```
docker run --name photobank-searchkit -v "$PWD":/usr/src/app -w /usr/src/app node:4.7.2 sh docker-run.sh
```
