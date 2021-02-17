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

module.exports.init = (serviceName) => {
  _serviceName = serviceName;
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

  // Enable jaeger exporter
  const options = {
    serviceName: _serviceName,
    host: "localhost",
    port: 6832,
  };
  const jaegerExporter = new JaegerExporter(options);
  provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
  provider.register();
};

module.exports.getTracer = (name) => {
  return opentelemetry.trace.getTracer(name);
};
