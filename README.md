# rpx-xui-terms-and-conditions
Terms and Conditions Microservice

# Initial Setup

Made by taking the share a case project, which has been integrated with the HMCTS pipeline and
generator-express-no-stress-typescript scaffold, to create a well structured project
that works with the HMCTS pipeline ( to be tested in next few days ).

@ref https://github.com/hmcts/rpx-xui-share-case
@ref https://github.com/cdimascio/generator-express-no-stress-typescript

# Development commands

Set environment variables `APP_ID` and `LOG_LEVEL` as well as `PORT` <br />
`yarn dev` - Starts node in development mode <br />
`yarn test` - Runs unit tests <br />
`yarn run dev:debug` - Runs debugger that an IDE can connect to <br />
`yarn run test:debug` - Runs debugger that an IDE can connect to

# Production commands

`yarn compile` - Transpile source code for a Production build. The compiled output is contained with the /dist folder
`yarn start` - Runs the production build locally - the /dist folder, so that you can test it when it's transpiled.

# Code cleaning commands

`yarn lint` - Runs ESLint
`yarn lint --fix` - Prettier is installed. Prettier will normalise your code formatting to a project standard formatting.

# Swagger

Swagger can be accessed on /api-explorer

Documentation for the API is contained within server/common/api.yml file, and should be added to when a developer
writes a new route.

# Docker

To run the Terms and Conditions Service using Docker do the following:

1. Build the Docker image
`docker build -t terms-and-conditions .`

2. Run the Docker Image inside a Container
`docker run -8080:3000 terms-and-conditions`

3. The Docker container with the Terms and Conditions service is now up and running 
on `http://localhost:8080` you can test it using the following GET requests:

`http://localhost:8080/health
http://localhost:8080/health/liveness`

See Swagger documentation for more route information.

# API Versioning 

We're keeping the version number within the path ie. /v1 as it comes with the scaffolding,
it's been discussed within the team - we've agreed to keep it in.

# API Validation

API Validation is controlled within the server/common/api.yml file, and should be added to when a developer
writes a new route.

# Postman

We have a Postman file with all the endpoints within the team for ease of testing
the API.

# Example requests

GET http://localhost:8080/api/v1/examples
GET http://localhost:8080/api/v1/examples/1
POST http://localhost:8080/api/v1/examples

