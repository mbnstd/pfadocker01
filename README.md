To run this project, run the following commands on terminal:

```sh
docker network create pfa

docker run --rm -d --name pfadocker01mysql --network=pfa -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=pfa mysql:latest

docker run --rm -d -v $(pwd):/usr/src/app --network=pfa --name=nodecontainer miguelbn/pfadocker01:latest

docker run --rm -d --network=pfa -p 8888:80 miguelbn/pfadocker01nginx
```
It may take about a minute for the app to be available.
Then use your browser to navigate to http://localhost:8888/
