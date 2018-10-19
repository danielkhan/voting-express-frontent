const {
  Tracer,
  BatchRecorder,
  ExplicitContext,
  jsonEncoder: { JSON_V2 }
} = require('zipkin');

const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

const ctxImpl = new ExplicitContext();
// const recorder = new ConsoleRecorder();
const localServiceName = 'express-frontend'; // name of this application
// const tracer = new Tracer({ ctxImpl, recorder, localServiceName });


// const CLSContext = require('zipkin-context-cls');
const { HttpLogger } = require('zipkin-transport-http');

// Setup the tracer to use http and implicit trace context


module.exports = (localServiceName) => {

  const tracer = new Tracer({
    ctxImpl,
    recorder: new BatchRecorder({
      logger: new HttpLogger({
        endpoint: 'http://localhost:9411/api/v2/spans',
        jsonEncoder: JSON_V2
      })
    }),
    localServiceName,
  });
  zipkinMiddleware({ tracer });
} 
