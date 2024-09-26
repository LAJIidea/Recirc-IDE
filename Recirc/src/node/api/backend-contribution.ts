import { injectable } from "inversify";
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { BackendApplicationContribution } from "@theia/core/lib/node";

@injectable()
export class RecircBackendContribution implements BackendApplicationContribution {

    constructor() {}

    configure(app: express.Application): void {

        app.get('/activity', (req, res) => {
            console.log("收到请求");
            res.json({'code': 0})
        })
    }

    onStart(server: http.Server | https.Server): void {
        let address = server.address();
        console.log(address);
    }

}