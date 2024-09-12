import { inject, injectable } from '@theia/core/shared/inversify';
import {
    ViewContainer,
    WidgetManager
} from '@theia/core/lib/browser';
import { NavigatorWidgetFactory } from "@theia/navigator/lib/browser/navigator-widget-factory";
import { RecircNavigatorWideget } from './navigator-widget';

@injectable()
export class RecircNavigatorWidegetFactory extends NavigatorWidgetFactory {

    @inject(ViewContainer.Factory)
    protected readonly viewContainerFactory: ViewContainer.Factory;
    @inject(WidgetManager) protected readonly widgetManager: WidgetManager;

    protected recircWidegetOptions: ViewContainer.Factory.WidgetOptions = {
        order: 2,
        canHide: true,
        initiallyCollapsed: true,
        weight: 60
    }

    override async createWidget(): Promise<ViewContainer> {
        const viewContainer = await super.createWidget();
        const recircWidget = await this.widgetManager.getOrCreateWidget(RecircNavigatorWideget.ID);
        viewContainer.addWidget(recircWidget, this.recircWidegetOptions);
        return viewContainer;
    }

}