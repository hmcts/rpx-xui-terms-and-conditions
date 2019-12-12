FROM hmctspublic.azurecr.io/base/node/alpine-lts-10:10-alpine as base

LABEL maintainer = "HMCTS Expert UI <https://github.com/hmcts>"

COPY --chown=hmcts:hmcts package.json yarn.lock ./

FROM base as build

RUN yarn

COPY --chown=hmcts:hmcts . .
RUN yarn compile && rm -r node_modules/ && yarn install --production && rm -r ~/.cache/yarn

FROM base as runtime
COPY --from=build $WORKDIR ./
USER hmcts
EXPOSE 3000
