import * as React from "@theia/core/shared/react";
import { inject, injectable, postConstruct } from "@theia/core/shared/inversify";
// import { 
//     ApplicationShell,
//     codicon,
//     ContextMenuRenderer,
//     defaultTreeProps,
//     NavigatableWidget,
//     NodeProps,
//     Saveable,
//     TabBar,
//     TreeDecoration,
//     TreeDecoratorService,
//     TreeModel,
//     TreeProps,
//     TreeWidget,
//     TREE_NODE_CONTENT_CLASS,
//     Widget
//  } from "@theia/core/lib/browser";
 import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
 import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
 import { MessageService } from '@theia/core';
 import { Message } from '@theia/core/lib/browser';
 
 @injectable()
 export class RecircNavigatorWideget extends ReactWidget {
 
     static readonly ID = 'Recirc:navigator';
     static readonly LABEL = 'Recirc Navigator';
 
     @inject(MessageService)
     protected readonly messageService!: MessageService;
 
     @postConstruct()
     protected init(): void {
         this.doInit()
     }
 
     protected async doInit(): Promise <void> {
         this.id = RecircNavigatorWideget.ID;
         this.title.label = RecircNavigatorWideget.LABEL;
         this.title.caption = RecircNavigatorWideget.LABEL;
         this.title.closable = true;
         this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
         this.update();
     }
 
     render(): React.ReactElement {
         const header = `This is a sample widget which simply calls the messageService
         in order to display an info message to end users.`;
         return <div id='widget-container'>
             <AlertMessage type='INFO' header={header} />
             <button id='displayMessageButton' className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
         </div>
     }
 
     protected displayMessage(): void {
         this.messageService.info('Congratulations: Recirc Widget Successfully Created!');
     }
 
     protected onActivateRequest(msg: Message): void {
         super.onActivateRequest(msg);
         const htmlElement = document.getElementById('displayMessageButton');
         if (htmlElement) {
             htmlElement.focus();
         }
     }
 
 }
 