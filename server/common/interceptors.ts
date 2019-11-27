import l from './logger';

export function requestInterceptor(request) {
    l.info(`${request.method.toUpperCase()} to ${request.url}`);
    //add timings to requests
    request.metadata = {startTime: new Date()};

    return request
}

export function successInterceptor(response) {
    response.config.metadata.endTime = new Date();
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
    l.info(`Success on ${response.config.method.toUpperCase()} to ${response.config.url} (${response.duration})`);
    return response;
}

export function errorInterceptor(error) {
    error.config.metadata.endTime = new Date();
    error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
    l.error(`Error on ${error.config.method.toUpperCase()} to ${error.config.url} in (${error.duration}) - ${error}`);

    return Promise.reject(error);
}
