#!/usr/bin/env node
import http from "http";
import chalk from "chalk";
import app from "../app";

let port = 5000;

const server = http.createServer(app.callback());

server.on("error", (e: Error & { code?: string }) => {
  if (e.code === "EADDRINUSE") {
    console.log(`Port ${port} is in use, trying another one...`);
    setTimeout(() => {
      server.close();
      server.listen(++port);
    }, 100);
  } else {
    console.error(chalk.red("[Koa Server] server error:"));
    console.error(e);
  }
});

server.on("listening", () => {
  console.log(`It is run on ${port}`);
});
server.listen(port);
