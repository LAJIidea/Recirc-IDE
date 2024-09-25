import * as React from 'react';
import { inject, injectable, postConstruct } from "@theia/core/shared/inversify";
import { SingleTextInputDialog, SingleTextInputDialogProps, LabelProvider } from '@theia/core/lib/browser';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
import URI from '@theia/core/lib/common/uri';

export const NEW_PROJECT_CONTENT_CLASS = 'recirc-new-project-dialog';
export const NEW_PROJECT_EXTENSIONS_CLASS = "recirc-about-extensions";

@injectable()
export class NewProjectProps extends SingleTextInputDialogProps {
  parentUri: URI
}

export class WorkspaceInputDialog extends SingleTextInputDialog {

  constructor(
      @inject(WorkspaceInputDialogProps) protected override readonly props: WorkspaceInputDialogProps,
      @inject(LabelProvider) protected readonly labelProvider: LabelProvider,
  ) {
      super(props);
      this.appendParentPath();
  }

  /**
   * Append the human-readable parent `path` to the dialog.
   * When possible, display the relative path, else display the full path (ex: workspace root).
   */
  protected appendParentPath(): void {
      // Compute the label for the parent URI.
      const label = this.labelProvider.getLongName(this.props.parentUri);
      const element = document.createElement('div');
      // Create the `folder` icon.
      const icon = document.createElement('i');
      icon.classList.add(...codiconArray('folder'));
      icon.style.marginRight = '0.5em';
      icon.style.verticalAlign = 'middle';
      element.style.verticalAlign = 'middle';
      element.style.paddingBottom = '1em';
      element.title = this.props.parentUri.path.fsPath();
      element.appendChild(icon);
      element.appendChild(document.createTextNode(label));
      // Add the path and icon div before the `inputField`.
      this.contentNode.insertBefore(element, this.inputField);
  }
}


commands.registerCommand(VscodeCommands.OPEN_FOLDER, {
  isVisible: () => false,
  execute: async (resource?: URI, arg: boolean | IOpenFolderAPICommandOptions = {}) => {
      if (!resource) {
          return commands.executeCommand(WorkspaceCommands.OPEN_WORKSPACE.id);
      }
      if (!URI.isUri(resource)) {
          throw new Error(`Invalid argument for ${VscodeCommands.OPEN_FOLDER.id} command with URI argument. Found ${resource}`);
      }
      let options: WorkspaceInput | undefined;
      if (typeof arg === 'boolean') {
          options = { preserveWindow: !arg };
      } else {
          options = { preserveWindow: !arg.forceNewWindow };
      }
      this.workspaceService.open(new TheiaURI(resource), options);
  }
});


@injectable()
export class NewProjectDialog extends SingleTextInputDialog {
  protected readonly okButton : HTMLButtonElement;

  @inject(WindowService)
  protected readonly windowService: WindowService;

  constructor(
    @inject(NewProjectProps) protected override readonly props: NewProjectProps,
    @inject(LabelProvider) protected readonly labelProvider: LabelProvider,
  ) {
    super(props)
    
  }

  protected appendContent(): void {
    // Compute the label for the paranet URI.
    const label = this.labelProvider.getLongName(this.props.parentUri)
  }

}