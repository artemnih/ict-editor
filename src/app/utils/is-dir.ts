import { NodeBinding } from "../types";

export function isDirectory(binding: NodeBinding) {
    return (
        binding.type === 'collection' ||
        binding.type === 'csvCollection' ||
        binding.name.toLowerCase() === 'inpdir' ||
        binding.name.toLowerCase().endsWith('path') ||
        binding.name.toLowerCase().endsWith('dir')
    );
}
