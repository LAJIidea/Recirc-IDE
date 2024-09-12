import { ContainerModule } from '@theia/core/shared/inversify';
import { RecircWidget } from './Recirc-widget';
import { RecircContribution } from './Recirc-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';
// import { FileNavigatorContribution } from '@theia/navigator/lib/browser/navigator-contribution';
// import { RecircNavigatorContribution } from './navigator/navigator-contribute';
// import { TabBarToolbarContribution } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { RecircNavigatorWideget } from './navigator/navigator-widget';
import { NavigatorWidgetFactory } from '@theia/navigator/lib/browser/navigator-widget-factory';
import { RecircNavigatorWidegetFactory } from './navigator/navigator-widget-factory';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // unbind(FileNavigatorContribution);
    // bindViewContribution(bind, RecircNavigatorContribution);
    // rebind(FrontendApplicationContribution).toService(RecircNavigatorContribution);
    // rebind(TabBarToolbarContribution).toService(RecircNavigatorContribution);

    bind(RecircNavigatorWideget).toSelf();
    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: RecircNavigatorWideget.ID,
        createWidget: () => container.get(RecircNavigatorWideget)
    })).inSingletonScope();

    // unbind(NavigatorWidgetFactory);
    // bind(RecircNavigatorWidegetFactory).toSelf().inSingletonScope();
    // rebind(WidgetFactory).toService(RecircNavigatorWidegetFactory);
    rebind(NavigatorWidgetFactory).to(RecircNavigatorWidegetFactory);

    bindViewContribution(bind, RecircContribution);
    bind(FrontendApplicationContribution).toService(RecircContribution);
    bind(RecircWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: RecircWidget.ID,
        createWidget: () => ctx.container.get<RecircWidget>(RecircWidget)
    })).inSingletonScope();
});
