import { FormlyFieldConfig } from '@ngx-formly/core';
import { NodeInputUI } from '../types';

export function ui2formly(uiInputs: NodeInputUI[]): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [];

    for (const uiInput of uiInputs) {
        let type = '';
        let subtype = '';
        let defaultValue = '' as string | number | boolean | unknown;
        let options = [] as { label: string; value: string | number | boolean | unknown }[];
        let condition;

        if (!uiInput.key) {
            continue;
        }

        switch (uiInput.type) {
            case undefined:
            case 'text':
            case 'number':
            case 'file':
                type = 'input';
                break;
            case 'checkbox':
            case 'boolean':
                type = 'checkbox';
                break;
            case 'enum':
            case 'select':
                type = 'select';
                break;
            case 'datetime':
                type = 'datetime';
                break;
            case 'color':
                type = 'color';
                break;
            case 'path':
                type = 'path';
                break;
            default:
                type = 'input';
        }

        switch (uiInput.type) {
            case 'number':
                subtype = 'number';
                break;
        }

        switch (uiInput.type) {
            case 'number':
                defaultValue = 0;
                break;
            case 'checkbox':
                defaultValue = false;
                break;
        }

        if (type === 'select' && uiInput.fields) {
            options = uiInput.fields.map((x) => ({ label: x, value: x }));
        }

        if (uiInput.condition) {
            condition = uiInput.condition;
            const inputsRegex = /(?<!model\.)inputs\./g;
            const outputsRegex = /(?<!model\.)outputs\./g;
            condition = condition.replace(inputsRegex, 'model.inputs.');
            condition = condition.replace(outputsRegex, 'model.outputs.');
            condition = `!(${condition})`; // invert the condition
        }

        const formlyField = {
            key: uiInput.key,
            type: type,
            defaultValue: defaultValue,
            props: {
                label: uiInput.title,
                required: uiInput.required || false,
            },
            expressions: {},
        } as FormlyFieldConfig;

        if (subtype) {
            formlyField.props!.type = subtype;
        }
        if (condition) {
            formlyField.expressions!['hide'] = condition;
        }
        if (options.length) {
            formlyField.props!.options = options;
        }
        if (uiInput.placeholder) {
            formlyField.props!.placeholder = uiInput.placeholder;
        }

        fields.push(formlyField);
    }
    return fields;
}
