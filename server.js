const http = require("http");
const createError = require('http-errors');
const express = require("express");
const server = express();

const fs = require("fs");
const path = require("path");
const logger = require("morgan");
const request = require("request");
const axios = require("axios");
const useragent = require('express-useragent');
const chalk = require("chalk");
const mysql = require("mysql2");
const bodyparser = require("body-parser");


const urlencoded = bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
});
const config = require("./configs/config.js");



server.use(useragent.express());
server.set('views', path.join(__dirname, './views'));
server.set('view engine', 'ejs');
server.use(logger('dev'));
server.use(express.static(path.join(__dirname,'./public')));
server.use(express.static(path.join(__dirname,'./node_modules')));
server.use(express.json({
    limit: '50mb',
}));
server.use(urlencoded);


// route loader
fs.readdirSync("./routers").forEach(async files => {
    try {
        let router = require(`./routers/${files}`);
        server.use(router);
        console.log(chalk.bold.greenBright('[Router] ') + chalk.bold.whiteBright(`Loaded : `) + chalk.bold.greenBright(files));
    }
    catch (e){
        console.log(chalk.bold.greenBright('[Router] ') + chalk.bold.whiteBright(`Fail to Load : `) + chalk.bold.redBright(files));
    }
});

// database
require("./database/connect.js").connect();

/*
server.listen(config.server.port, () =>{
    
});
*/


const server_port = normalizePort(String(config.server.port));
server.set("port", server_port);

const serv = http.createServer(server);
serv.on("error", onError);
serv.listen(server_port);
serv.on("listening", async() =>{
    console.log(chalk.bold.cyanBright("[APP] ") + chalk.bold.whiteBright(`Localhost : http://${config.server.address}:${config.server.port}`));
    console.log(chalk.bold.cyanBright("[APP] ") + chalk.bold.whiteBright(`Listening on port : `) + chalk.bold.yellowBright(String(config.server.port)));
});



function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    let bind = typeof server_port === "string" ? "Pipe " + server_port : "Port " + server_port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}