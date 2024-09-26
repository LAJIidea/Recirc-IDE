import { inject, injectable } from "@theia/core/shared/inversify";
import { Command, CommandContribution, CommandRegistry } from "@theia/core/lib/common/command";
import { MenuContribution, MenuModelRegistry, MessageService, nls, URI } from '@theia/core';
import { CommonMenus, FrontendApplication, LabelProvider, OpenerService } from "@theia/core/lib/browser";
import { FileService } from "@theia/filesystem/lib/browser/file-service";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { Emitter, Event } from "@theia/core/lib/common";
import { NewProjectDialog, NewProjectItem } from "./new-project-dialog";

export const NewProjectCommand: Command = { id: 'Recirc:NewProject', label: 'New Project' };

export interface DidCreateNewProjectEvent {
  path: string;
  name: string;
}

@injectable()
export class NewProjectContribution implements CommandContribution, MenuContribution {

  @inject(LabelProvider) protected readonly labelProvider: LabelProvider;
  @inject(FileService) protected readonly fileService: FileService;
  @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService;
  @inject(OpenerService) protected readonly openerService: OpenerService;
  @inject(FrontendApplication) protected readonly app: FrontendApplication;
  @inject(MessageService) protected readonly messageService: MessageService;

  private readonly onDidCreateNewProjectEmitter = new Emitter<DidCreateNewProjectEvent>();

  get onDidCreateNewProject() : Event<DidCreateNewProjectEvent> {
    return this.onDidCreateNewProjectEmitter.event;
  }

  protected fireCreateNewProject(event: DidCreateNewProjectEvent): void {
    this.onDidCreateNewProjectEmitter.fire(event);
  }

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(NewProjectCommand, {
      execute: () => {
        const dialog = new NewProjectDialog({
          title: nls.localizeByDefault('New Project'),
          maxWidth: 600,
          initValue: 'empty-project',
          placeholder: "empty-project",
          validate: item => this.validateProjectName(item)
        }, this.labelProvider);
        dialog.open().then(async item => {
          if (item) {
            const completePath = new URI(item.path + "/" + item.name);
            await this.fileService.createFolder(completePath)
            this.fireCreateNewProject({path: item.path, name: item.name});
            this.workspaceService.open(completePath);
            // open file
            // this.opernService.open
          }
        })
      }
    })
  }

  registerMenus(menus: MenuModelRegistry): void {
    menus.registerMenuAction(CommonMenus.FILE, {
      commandId: NewProjectCommand.id,
      label: NewProjectCommand.label,
      order: '0'
    })
  }

  protected async validateProjectName(name: NewProjectItem): Promise<string> {
    // todo check file 
    return '';
  }

}