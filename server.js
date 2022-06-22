const http = require("http");
const express = require("express");
const path = require("path");
const app = require("./backend/app");

const PORT = process.env.PORT || 3000;

app.set("port", PORT);

// ------------- STATIC FILES
app.use(express.static(path.join(__dirname, "/dist/angularExpress")));
app.use(express.static(path.join(__dirname, "/src/app/components/mainpage")));

const server = http.createServer(app);

server.listen(PORT);
