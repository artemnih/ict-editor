import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { UIConfig } from '../types';
import { ui2formly } from '../utils/ict-to-formly';

@Component({
    selector: 'app-node-settings',
    templateUrl: './node-settings.component.html',
    styleUrls: ['./node-settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormlyModule],
})
export class NodeSettingsComponent implements OnInit {
    @Input() uiConfig?: UIConfig;
    protected settings = {};
    protected form = new FormGroup({});
    protected config?: any = {};

    ngOnInit() {
        this.config = ui2formly(this.uiConfig!.ui);
    }

    ngOnChanges(simpleChanges: any) {
        if (simpleChanges.uiConfig) {
            this.config = ui2formly(this.uiConfig!.ui);
        }
    }
}
