"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentSDK = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
const api_proto_1 = require("api-proto");
class ContentSDK {
    constructor(address) {
        const ServerClient = grpc_js_1.makeClientConstructor(api_proto_1.ContentService, api_proto_1.ContentService.constructor.name);
        this.client = new ServerClient(address, grpc_js_1.ChannelCredentials.createInsecure());
    }
    async connect() {
        return new Promise((resolve, reject) => {
            this.client.waitForReady(Date.now() + 30000, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async getContent() {
        const request = new api_proto_1.ContentRequest();
        return new Promise((resolve, reject) => {
            this.client.getContent(request, (error, response) => {
                if (error) {
                    return reject(error);
                }
                const content = response.getContent();
                resolve(content);
            });
        });
    }
}
exports.ContentSDK = ContentSDK;
