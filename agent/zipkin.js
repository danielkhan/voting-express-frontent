const {
  Tracer,
  BatchRecorder,
  ExplicitContext,
  jsonEncoder: { JSON_V2 }
} = require('zipkin');

const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const wrapRequest = require('zipkin-instrumentation-request');
const request = require('request');
const CLSContext = require('zipkin-context-cls');
const { HttpLogger } = require('zipkin-transport-http');

module.exports = (localServiceName) => {
  const tracer = new Tracer({
    ctxImpl: new CLSContext('zipkin'),
    recorder: new BatchRecorder({
      logger: new HttpLogger({
        endpoint: 'http://localhost:9411/api/v2/spans',
        jsonEncoder: JSON_V2
      })
    }),
    localServiceName,
  });
  return {
    middleware: () => zipkinMiddleware({ tracer }),
    request: (remoteServiceName) => wrapRequest(request, { tracer, remoteServiceName }),
  }
} 

/*
// Usage:
// Express middleware:

const zipkin = require('./agent/zipkin')('<Local Service Name>');
const app = express();
app.use(zipkin.middleware());

// To get a wrapped request object:
const request = zipkin.request('<Remote Service Name>');
*/