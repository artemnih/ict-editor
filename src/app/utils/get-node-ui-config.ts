import { PluginX, NodeInput, NodeInputUI, UIConfig } from '../types';
import { isDirectory } from './is-dir';

/**
 * Get the UI configuration for the given plugin. Convert input dirs into non-UI inputs.
 * @param plugin PluginX object
 */
export function getNodeUiConfig(plugin: PluginX): UIConfig {
    if (!plugin) {
        console.error('Plugin is not defined');
        return { ui: [], inputs: [], outputs: [] };
    }

    const uis = (plugin.ui || []).slice();
    const pluginInputs = (plugin.inputs || []).slice();

    // split inputs into UI (form) and non-UI (circle inlets)
    const nonUiInputs = [] as NodeInput[]; // circle inlets on the left side of the node
    const uiInputs = [] as NodeInputUI[]; // UI inputs such as text fields, checkboxes, etc.

    for (let i = pluginInputs.length - 1; i >= 0; i--) {
        const input = pluginInputs[i];

        // find the UI element that corresponds to this input
        const uiInput = uis.find((x) => x.key === 'inputs.' + input.name);
        const isDir = isDirectory(input);

        // if input is a directory - move it to the non-UI section
        if (isDir) {
            nonUiInputs.push(input);
        }

        // in some cases UI is missing for the input, so we need to create it
        // but only if it's not a directory
        if (!uiInput && !isDir) {
            const calculatedUiInput = {
                key: 'inputs.' + input.name,
                type: input.type,
                title: input.name,
                required: input.required,
                format: input.format,
            } as NodeInputUI;

            uiInputs.push(calculatedUiInput);
        }

        if (uiInput && !isDir) {
            uiInput.required = input.required;
            uiInput.format = input.format;
            uiInputs.push(uiInput);
        }
    }

    const outputs = plugin.outputs || [];

    // if output has UI - move it to the UI section
    // this is mostly for internal nodes such as Input Data Directory
    outputs.forEach((output) => {
        const uiOutput = uis.find((x) => x.key === 'outputs.' + output.name);
        if (uiOutput) {
            uiInputs.push(uiOutput);
        }
    });

    return { ui: uiInputs, inputs: nonUiInputs, outputs: outputs };

}
