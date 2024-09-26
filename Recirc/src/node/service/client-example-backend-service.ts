import { injectable } from "@theia/core/shared/inversify";
import { BackendWithClientService, BackendClient } from "../../common/client-example-service";

@injectable()
export class BackendWithClientServiceImpl implements BackendWithClientService {
  private client?: BackendClient;

  greet(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.client ? this.client.getName().then(greet => resolve('Hello' + greet))
        : reject('No client')
    });
  }

  dispose(): void {
    // do nothing
  }

  setClient(client: BackendClient): void {
    this.client = client;
  }
}