import {ChannelCredentials, makeClientConstructor, ServiceError} from '@grpc/grpc-js';
import {ContentClient, ContentService, ContentRequest, ContentResponse} from 'api-proto';

export class Sdk {
	client: ContentClient;

	constructor(address: string) {
		const ServerClient = makeClientConstructor(ContentService, ContentService.constructor.name);
		this.client = new ServerClient(address, ChannelCredentials.createInsecure()) as unknown as ContentClient;
	}

	async connect(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.client.waitForReady(Date.now() + 30000, (error) => {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		});
	}

	async getContent(): Promise<string> {
		let request = new ContentRequest();
		return new Promise((resolve, reject) => {
			this.client.getContent(request, (error: ServiceError | null, response: ContentResponse): void => {
				if (error) {
					return reject(error);
				}
				let content = response.getContent();
				resolve(content);
			});
		});
	}
}
