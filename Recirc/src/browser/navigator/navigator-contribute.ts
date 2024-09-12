import { injectable } from "@theia/core/shared/inversify";
import { FileNavigatorContribution } from "@theia/navigator/lib/browser/navigator-contribution";
// import { NavigatableWidget } from "@theia/core/lib/browser";
// import { RecircNavigatorWideget } from "./navigator-widget";

@injectable()
export class RecircNavigatorContribution extends FileNavigatorContribution {

    // protected get recircWidgets(): NavigatableWidget {
    //     const recircWidget = this.widgetManager.tryGetWidget<RecircNavigatorWideget>(RecircNavigatorWideget.ID);
    //     // return recircWidget
    // }

}