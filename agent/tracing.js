"use strict";

const opentelemetry = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/node");
const {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} = require("@opentelemetry/tracing");

// To test export to jaeger
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");

let _serviceName = "";

const provider = new NodeTracerProvider();
provider.register();

module.exports.init = (serviceName) => {
  _serviceName = serviceName;
};

module.exports.getTracer = (name) => {
  return opentelemetry.trace.getTracer(name);
};

module.exports.enableConsoleExporter = () => {
  // Also add console exporter - at least for debugging
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
};

module.exports.enableJaegerExporter = () => {
  // Enable jaeger exporter
  const options = {
    serviceName: _serviceName,
    host: process.env.JAEGER_AGENT_HOST,
    port: process.env.JAEGER_AGENT_PORT,
  };
  const jaegerExporter = new JaegerExporter(options);
  provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
};
