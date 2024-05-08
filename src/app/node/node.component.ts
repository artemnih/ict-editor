import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NodeInput, NodeOutput, PluginX, UIConfig } from '../types';
import { getNodeUiConfig } from '../utils/get-node-ui-config';
import { NodeSettingsComponent } from "../node-settings/node-settings.component";

@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, NgStyle, NodeSettingsComponent]
})
export class NodeComponent {
    @ViewChild('rootElement', { static: true }) rootElement!: ElementRef;
    @Input() plugin?: PluginX;
    x = 20;
    y = 20;
    z = 1;
    width = 250;
    selected = false;
    shadowed = false;
    expanded = true
    status = '';
    protected inputs!: NodeInput[];
    protected outputs!: NodeOutput[];
    protected uiConfig!: UIConfig;

    ngOnInit() {
        this.update();
    }

    ngOnChanges(simpleChanges: any) {
        if (simpleChanges.plugin) {
            this.update();
        }
    }

    update() {
        const config = getNodeUiConfig(this.plugin!);
        this.inputs = config.inputs;
        this.outputs = config.outputs;
        this.uiConfig = config;
    }
}
