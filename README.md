# Annon Dashboard

[![Build history](https://buildstats.info/travisci/chart/Nebo15/annon.web)](https://travis-ci.org/Nebo15/annon.web)

Annon Dashboard is a management UI for [Annon API Gateway](github.com/nebo15/annon.api). It allows to manage configuration and review requests history.

## Demo

![UI Screenshow](https://github.com/Nebo15/annon.web/raw/master/docs/images/ui-animated.gif)

# Dependencies

- [nebo15/annon_api](https://hub.docker.com/r/nebo15/annon_api/) >= 0.2.94

## Installation

### Heroku One-Click Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/nebo15/annon.web)

### Docker

## Deployment

Dashboard can be deployed as a single container from [nebo15/annon.web](https://hub.docker.com/r/nebo15/annon.web/) Docker Hub.

More information you can find in [Annon Infrastructure](https://github.com/Nebo15/annon.infra).

## Configurations

Application supports these environment variables:

| Environment Variable  | Default Value           | Description |
| --------------------- | ----------------------- | ----------- |
| `PORT`                | `8080`                  | Node.js server port. |
| `MANAGEMENT_ENDPOINT` | `http://localhost:4001` | Annon API Gateway management API endpoint. |
| `PUBLIC_ENDPOINT`     | `http://localhost:4000` | Annon API Gateway public API endpoint. |
| `TRACER_URL`          | not set                 | URL will be used in link to external requests tracer (see [#42](https://github.com/Nebo15/annon.web/issues/42)). |

## Docs

Dashboard works on top of [Annon API Gateway management API](http://docs.annon.apiary.io/).

## Contribution

### Technologies

- React
- Redux
- Webpack
- Enzyme
- Karma
- Nightwatch

### Starting Development Environment

#### Start Dashboard

```
npm run dev ## run app localy
```

#### Start Annon Gateway (API)

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

### Workflow

#### Git flow

Every task should start a new branch. Branch should be named as task number what its corresponding.
After finish work on a task, you need to create PR.

#### Testing

To contribute to the repository be ready to write some tests.

- Unit tests for business logic (we use Mocha)
- Integration tests for UI components (we use Enzyme)
- Acceptance tests for user stories (we use Nightwatch)

#### Pull Requests

Every task finishes with PR. Eslint, Stylelint, and tests are blocking PRs. To simplify PR review, we deploy every PR's branch automatically on Heroku.

## License

See [LICENSE.md](LICENSE.md).
