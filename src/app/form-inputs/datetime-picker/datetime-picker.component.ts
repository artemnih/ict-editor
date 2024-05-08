import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
    selector: 'app-datetime-picker',
    template: `<input type="date" [formControl]="formControl" [formlyAttributes]="field" />`,
    styleUrls: ['./datetime-picker.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormlyModule],
})
export class DatetimePickerComponent extends FieldType<FieldTypeConfig> {}
