import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-path-picker',
    standalone: true,
    imports: [ReactiveFormsModule, FormlyModule, JsonPipe],
    templateUrl: './path-picker.component.html',
    styleUrl: './path-picker.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathPickerComponent extends FieldType<FieldTypeConfig> implements OnInit {
    protected disabled = false;

    ngOnInit() {
    }

    showExplorer() {

    }
}
