import 'reflect-metadata';
import { MessageService } from '@theia/core';
import { ContainerModule, Container } from '@theia/core/shared/inversify';
import { RecircWidget } from './Recirc-widget';
import { render } from '@testing-library/react'

describe('RecircWidget', () => {

    let widget: RecircWidget;

    beforeEach(async () => {
        const module = new ContainerModule( bind => {
            bind(MessageService).toConstantValue({
                info(message: string): void {
                    console.log(message);
                }
            } as MessageService);
            bind(RecircWidget).toSelf();
        });
        const container = new Container();
        container.load(module);
        widget = container.resolve<RecircWidget>(RecircWidget);
    });

    it('should render react node correctly', async () => {
        const element = render(widget.render());
        expect(element.queryByText('Display Message')).toBeTruthy();
    });

    it('should inject \'MessageService\'', () => {
        const spy = jest.spyOn(widget as any, 'displayMessage')
        widget['displayMessage']();
        expect(spy).toBeCalled();
    });

});
