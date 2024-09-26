import { inject, injectable } from "@theia/core/shared/inversify";
import { LabelProvider, AbstractDialog, DialogProps, DialogMode, DialogError, codiconArray, Message } from '@theia/core/lib/browser';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
import { MaybePromise } from '@theia/core';

export const NEW_PROJECT_CONTENT_CLASS = 'recirc-new-project-dialog';
export const NEW_PROJECT_EXTENSIONS_CLASS = "recirc-about-extensions";

export class NewProjectItem {
  name: string;
  path: string
}

@injectable()
export class NewProjectProps extends DialogProps {
  readonly initValue?: string;
  readonly placeholder?: string
  readonly validate?: (input: NewProjectItem, mode: DialogMode) => MaybePromise<DialogError>;
}

@injectable()
export class NewProjectDialog extends AbstractDialog<NewProjectItem> {
  protected readonly okButton : HTMLButtonElement;

  protected readonly inputName : HTMLInputElement;
  protected readonly inputPath : HTMLInputElement;

  @inject(WindowService)
  protected readonly windowService: WindowService;

  constructor(
    @inject(NewProjectProps) protected override readonly props: NewProjectProps,
    @inject(LabelProvider) protected readonly labelProvider: LabelProvider,
  ) {
    super(props);

    this.inputName = document.createElement('input');
    this.inputName.type = 'text';
    this.inputName.className = 'theia-input';
    this.inputName.spellcheck = false;
    this.inputName.setAttribute('style', 'flex: 0;');
    this.inputName.placeholder = props.placeholder || '';
    this.inputName.value = props.initValue || '';
    this.inputName.select();
    this.contentNode.appendChild(this.inputName);

    this.inputPath = document.createElement('input');
    this.inputPath.type = 'text';
    this.inputPath.className = 'theia-input';
    this.inputPath.spellcheck = false;
    this.inputPath.setAttribute('style', 'flex: 0;');
    this.inputPath.select();
    this.contentNode.appendChild(this.inputPath);
    
    this.controlPanel.removeChild(this.errorMessageNode); 
    this.contentNode.appendChild(this.errorMessageNode);
    this.appendAcceptButton("create");

    const element = document.createElement('div');
    // Create the `add` icon.
    const icon = document.createElement('i');
    icon.classList.add(...codiconArray('add'));
    icon.style.marginRight = '0.5em';
    icon.style.verticalAlign = 'middle';
    element.style.verticalAlign = 'middle';
    element.style.paddingBottom = '1em';
    element.title = "ProjectName";
    element.appendChild(icon);
    element.appendChild(document.createTextNode("ProjectName"));
    this.contentNode.insertBefore(element, this.inputName);

    const pathElement = document.createElement('div');
    // Create the `add` icon.
    const pathIcon = document.createElement('i');
    pathIcon.classList.add(...codiconArray('folder'));
    pathIcon.style.marginRight = '0.5em';
    pathIcon.style.verticalAlign = 'middle';
    pathElement.style.verticalAlign = 'middle';
    pathElement.style.paddingBottom = '1em';
    pathElement.title = "ProjectPath";
    pathElement.appendChild(pathIcon);
    pathElement.appendChild(document.createTextNode("ProjectPath"));
    this.contentNode.insertBefore(pathElement, this.inputPath);
  }


  get value() : NewProjectItem {
    return {name: this.inputName.value, path: this.inputPath.value};
  }

  protected override isValid(value: NewProjectItem, mode: DialogMode): MaybePromise<DialogError> {
    if (this.props.validate) {
      return this.props.validate(value, mode);
    }
    return super.isValid(value, mode)
  }

  protected override onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    this.addUpdateListener(this.inputName, 'input');
    this.addUpdateListener(this.inputPath, 'input');
  }

  protected override onActivateRequest(msg: Message): void {
    this.inputName.focus();
  }

  protected override handleEnter(event: KeyboardEvent): boolean | void {
    if (event.target instanceof HTMLInputElement) {
      return super.handleEnter(event);
    }
    return false;
  }

}