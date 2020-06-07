import { ContentClient } from 'api-proto';
export declare class ContentSDK {
    client: ContentClient;
    constructor(address: string);
    connect(): Promise<void>;
    getContent(): Promise<string>;
}
