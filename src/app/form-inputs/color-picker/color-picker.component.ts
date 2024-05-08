import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
    selector: 'app-color-picker',
    template: `<input [colorPicker]="color" [style.background]="color" [value]="color" (colorPickerChange)="onChange($event)" />`,
    styleUrls: ['./color-picker.component.scss'],
    standalone: true,
    imports: [ColorPickerModule],
})
export class ColorPickerComponent extends FieldType<FieldTypeConfig> {
    public get color(): string {
        return this.formControl.value;
    }

    onChange(event: string) {
        this.formControl.setValue(event);
        this.formControl.markAsDirty();
    }
}
