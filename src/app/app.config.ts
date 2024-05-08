import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ColorPickerComponent, ColorPickerModule } from 'ngx-color-picker';
import { DatetimePickerComponent } from './form-inputs/datetime-picker/datetime-picker.component';
import { PathPickerComponent } from './form-inputs/path-picker/path-picker.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      MonacoEditorModule.forRoot(),
      FormlyBootstrapModule,
      ColorPickerModule,
      FormlyModule.forRoot({
          types: [
              { name: 'datetime', component: DatetimePickerComponent, wrappers: ['form-field'] },
              { name: 'color', component: ColorPickerComponent as any, wrappers: ['form-field'] },
              { name: 'path', component: PathPickerComponent, wrappers: ['form-field'] },
          ],
          extras: {
              immutable: true,
          },
      })
  ),
  ]
};
