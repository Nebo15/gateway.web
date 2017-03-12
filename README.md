# API Gateway Dashboard

[![Greenkeeper badge](https://badges.greenkeeper.io/Nebo15/gateway.web.svg)](https://greenkeeper.io/)

[![Build history](https://buildstats.info/travisci/chart/Nebo15/gateway.web)](https://travis-ci.org/Nebo15/gateway.web)

API Gateway Dashboard - manage API Gateway settings, review and replay requests from history.

Docker Container: https://hub.docker.com/r/nebo15/gateway.web/   
API: https://github.com/Nebo15/os.gateway   
Docs: http://docs.annon.apiary.io/    

## Technologies

- React
- Redux
- Webpack
- Enzyme
- Karma
- Nightwatch

## Development

### Run web

```
npm run dev ## run app localy
```

### Run API:

```
docker-compose up
```

At the first time, API will not start because a Postgres need time to create database and etc. The official Postgres docker container is sending start signal before the full end of the starting process.

So, after failure of first time up process, exec `docker-compose up` one more time.

After `docker-compose down` you need to repeat `docker-compose up` twice too.

API is running at:

```
http://localhost:4000 - public api
http://localhost:4001 - management api
```

## Workflow

### Git flow

Every task should start a new branch. Branch should be named as task number what its corresponding.
After finish work on a task, you need to create PR.

### Testing

To contribute to the repository be ready to write some tests.

- Unit tests for business logic (we use Mocha)
- Integration tests for UI components (we use Enzyme)
- Acceptance tests for user stories (we use Nightwatch)

### PR

Every task finishes with PR. Eslint, Stylelint, and tests are blocking PRs. To simplify PR review, we deploy every PR's branch automatically on Heroku.
