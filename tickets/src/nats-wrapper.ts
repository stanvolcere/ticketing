import stan, { Stan } from 'node-nats-streaming';

class NatsWrapper {
	// Tells Typescript that the _client property may be 
	// undefinned for some period of time
	private _client?: Stan;

	connect(clusterId: string, clientId: string, url: string) {
		this._client = stan.connect(clusterId, clientId, { url });

		return new Promise<void>((resolve, reject) => {
			// Typescript is saying that the _client may be undefinned when you 
			// use it.  
			// We use the ! here to tell typescript to not worry about it because 
			// we are sure the varibale will be defined at this point
			this._client!.on('connect', () => {
				console.log('NATS successfully connetted');
				resolve();
			});

			this._client!.on('error', (err) => {
				reject(err);
			})
		})
	}
}

export const natsWrapper = new NatsWrapper();