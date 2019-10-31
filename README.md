# rpx-xui-terms-and-conditions
Terms and Conditions Microservice

# Initial Setup

Made by taking the share a case project, which has been integrated with the HMCTS pipeline and
generator-express-no-stress-typescript scaffold, to create a well structured project
that works with the HMCTS pipeline ( to be tested in next few days ).

@ref https://github.com/cdimascio/generator-express-no-stress-typescript

# Common CLI commands

`yarn dev` - Starts node in development mode
`yarn test` - Runs unit tests
`yarn run dev:debug` - Runs Debugger that an IDE can connect to
`yarn run test:debug` - Runs Debugger that an IDE can connect to
`yarn compile` - Transpile source code for a Production build which is contained with the /dist folder
`yarn start` - Runs Production build /dist folder locally
`yarn lint` - Runs ESLint
`yarn lint --fix` - Prettier is installed this will normalise your code formatting with the rest of the project.

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

