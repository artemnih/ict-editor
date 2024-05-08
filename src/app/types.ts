export type Dictionary<T> = { [key: string]: T };

export interface NodeInputUI {
    key: string;
    title: string;
    description: string;
    type: string;
    required?: boolean;
    fields?: string[];
    condition?: string;
    placeholder?: string;
    format?: string | Dictionary<unknown>;
}

export interface NodeInputOptions {
    values: string[];
}

export interface NodeBinding {
    name: string;
    type: string;
    required?: boolean;
    description?: string;
    format?: string | Dictionary<unknown>;
}

export interface NodeInput extends NodeBinding {
    options?: NodeInputOptions;
}

export interface NodeOutput extends NodeBinding { }

export interface PluginX {
    id: string; // mongo id internal
    pid: string;
    name: string;
    version: string;
    title: string;
    author?: string;
    contact?: string;
    description: string;
    container?: string;
    entrypoint?: string;
    documentation?: string;
    inputs: NodeInput[];
    outputs: NodeOutput[];
    ui: NodeInputUI[];
    institution?: string;
    repository?: string;
    specVersion?: string;
    baseCommand?: Array<string>;
    hardware?: {
        [key: string]: any;
    };
    internal?: boolean;
    path?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export type UIConfig = { ui: NodeInputUI[]; inputs: NodeInput[]; outputs: NodeInput[] };
