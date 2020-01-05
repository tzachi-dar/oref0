#!/usr/bin/env node

'use strict';

var os = require("os");

function serverListen() {

    const net = require('net');
    const fs = require('fs');
    const unixSocketServer = net.createServer();

    var socketPath = '/tmp/unixSocket';
    fs.unlinkSync(socketPath);
    unixSocketServer.listen(socketPath, () => {
        console.log('now listening');
    });

    unixSocketServer.on('connection', (s) => {
        console.log('got connection!');
        s.on("data", function(data) {
            //... do stuff with the data ...
            console.log('read data', data.toString());
            var command = data.toString().split(' ');

            var result = 'unknown command';

            if (command[0] == 'ns-status') {
                result = 'running ns-client';
            }

            s.write('executing\n');
            s.write('got result ' + result + '\n');
            s.end();
        });
    });
}

if (!module.parent) {
    serverListen();
}