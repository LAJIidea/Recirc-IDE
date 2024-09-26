import { ConnectionHandler, RpcConnectionHandler} from '@theia/core';
import { ContainerModule } from 'inversify';
import { BackendApplicationContribution } from '@theia/core/lib/node';
import { RecircBackendContribution } from './api/backend-contribution';
import { modifyServicePath, modifyServiceSymbol } from '../common/modify-service';
import { BackendModifyService } from './service/modify-backend-service';
import { BackendClient, BackendWithCLientSymbol, BackendWithCLientPath } from "../common/client-example-service";
import { BackendWithClientServiceImpl } from './service/client-example-backend-service';

export default new ContainerModule(bind => {
  bind(BackendApplicationContribution).to(RecircBackendContribution).inSingletonScope();

  bind(modifyServiceSymbol).to(BackendModifyService).inSingletonScope();
  bind(ConnectionHandler).toDynamicValue(context =>
    new RpcConnectionHandler(modifyServicePath, () =>
      context.container.get(modifyServiceSymbol)
    )
  ).inSingletonScope();

  bind(BackendWithCLientSymbol).to(BackendWithClientServiceImpl).inSingletonScope();
  bind(ConnectionHandler).toDynamicValue(ctx => {
    new RpcConnectionHandler<BackendClient>(BackendWithCLientPath, client => {
      const server = ctx.container.get<BackendWithClientServiceImpl>(BackendWithCLientSymbol);
      server.setClient(client);
      client.onDidCloseConnection(() => server.dispose());
      return server;
    })
  }).inSingletonScope();
});