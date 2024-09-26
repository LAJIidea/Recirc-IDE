import { ContainerModule, injectable } from '@theia/core/shared/inversify';
import { RecircWidget } from './Recirc-widget';
import { RecircContribution } from './Recirc-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import { ServiceConnectionProvider } from "@theia/core/lib/browser/messaging/service-connection-provider";

import '../../src/browser/style/index.css';
// import { FileNavigatorContribution } from '@theia/navigator/lib/browser/navigator-contribution';
// import { RecircNavigatorContribution } from './navigator/navigator-contribute';
// import { TabBarToolbarContribution } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { RecircNavigatorWideget } from './navigator/navigator-widget';
import { NavigatorWidgetFactory } from '@theia/navigator/lib/browser/navigator-widget-factory';
import { RecircNavigatorWidegetFactory } from './navigator/navigator-widget-factory';
import { NewProjectContribution } from './new-project-contributes';
import { CommandContribution, MenuContribution } from '@theia/core';
import { BackendClient, BackendWithCLientPath, BackendWithClientService, BackendWithCLientSymbol } from '../common/client-example-service';
import { modifyServiceSymbol, ModifyService, modifyServicePath } from '../common/modify-service';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(RecircNavigatorWideget).toSelf();
    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: RecircNavigatorWideget.ID,
        createWidget: () => container.get(RecircNavigatorWideget)
    })).inSingletonScope();

    rebind(NavigatorWidgetFactory).to(RecircNavigatorWidegetFactory);

    bindViewContribution(bind, RecircContribution);
    bind(FrontendApplicationContribution).toService(RecircContribution);
    bind(RecircWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: RecircWidget.ID,
        createWidget: () => ctx.container.get<RecircWidget>(RecircWidget)
    })).inSingletonScope();

    bind(NewProjectContribution).toSelf().inSingletonScope();
    bind(CommandContribution).toService(NewProjectContribution);
    bind(MenuContribution).toService(NewProjectContribution);

    // connect userinfo backend
    bind(BackendClient).to(BackendClientImpl).inSingletonScope();
    bind(BackendWithCLientSymbol).toDynamicValue(ctx => {
        const connection = ctx.container.get(ServiceConnectionProvider);
        const backendClient: BackendClient = ctx.container.get(BackendClient);
        return connection.createProxy<BackendWithClientService>(BackendWithCLientPath, backendClient);
    }).inSingletonScope();

    bind(modifyServiceSymbol).toDynamicValue(ctx => {
        const connection = ctx.container.get(ServiceConnectionProvider);
        return connection.createProxy<ModifyService>(modifyServicePath);
    }).inSingletonScope();
});


@injectable()
class BackendClientImpl implements BackendClient {
    getName(): Promise<string> {
        return new Promise(resolve => resolve('client'));
    }
}