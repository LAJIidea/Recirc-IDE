import { RpcServer } from "@theia/core/lib/common/messaging";

export const BackendWithCLientSymbol = Symbol('BackendWithClient');
export const BackendWithCLientPath = '/services/withClient';

export interface BackendWithClientService extends RpcServer<BackendClient> {
  greet(): Promise<string>
}

export const BackendClient = Symbol('BackendClient');
export interface BackendClient {
  getName(): Promise<string>;
}