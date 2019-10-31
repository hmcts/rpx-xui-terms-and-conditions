# rpx-xui-terms-and-conditions
Terms and Conditions Microservice

# Initial Setup

Made by taking the share a case project, which has been integrated with the HMCTS pipeline and
generator-express-no-stress-typescript scaffold, to create a well structured project
that works with the HMCTS pipeline ( to be tested in next few days ).

@ref https://github.com/hmcts/rpx-xui-share-case
@ref https://github.com/cdimascio/generator-express-no-stress-typescript

# Development commands

`yarn dev` - Starts node in development mode
`yarn test` - Runs unit tests
`yarn run dev:debug` - Runs debugger that an IDE can connect to
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

# API Validation

API Validation is controlled within the server/common/api.yml file, and should be added to when a developer
writes a new route.

# Example requests

GET http://localhost:8080/api/v1/examples
GET http://localhost:8080/api/v1/examples/1
POST http://localhost:8080/api/v1/examples

