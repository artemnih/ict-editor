import { Component, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeComponent } from './node/node.component';
import { PluginX } from './types';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import * as jsYaml from 'js-yaml';

const ICT =
  `author:
- Example
contact: example@example.com
container: someOrg/someContainer:1.1.1
description: Rename and store image collection files in a new image collection
entrypoint: python3 -m example.images.formats.file_renaming
inputs:
- description: Filename pattern used to separate data
  format:
  - string
  name: filePattern
  required: true
  type: string
- description: Input image collection to be processed by this plugin
  format:
  - collection
  name: inpDir
  required: true
  type: path
- description: Desired filename pattern used to rename and separate data
  format:
  - string
  name: outFilePattern
  required: true
  type: string
- description: Get directory name incorporated in renamed files
  format:
  - enum
  name: mapDirectory
  required: false
  type: string
name: example/file-renaming
outputs:
- description: Output collection
  format:
  - collection
  name: outDir
  required: true
  type: path
repository: https://github.example
specVersion: 1.0.0
title: File Renaming
ui:
- description: Filename pattern used to separate data
  key: inputs.filePattern
  title: Filename pattern
  type: text
- description: Input image collection to be processed by this plugin
  key: inputs.inpDir
  title: Input collection
  type: path
- description: Desired filename pattern used to rename and separate data
  key: inputs.outFilePattern
  title: Output filename pattern
  type: text
- description: Get directory name incorporated in renamed files
  fields:
  - raw
  - map
  - default
  key: inputs.mapDirectory
  title: mapDirectory
  type: select
version: 0.2.4-dev0`

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NodeComponent, MonacoEditorModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #renderer = inject(Renderer2);
  #listeners: (() => void)[] = [];
  #startX = 0;
  #startY = 0;
  #resizeTarget = '';

  leftWidth = 0;
  topHeight = 0;

  editorOptions = { theme: 'vs-dark', language: 'yaml', minimap: { enabled: false }, automaticLayout: true };
  ict = ICT;
  plugin = jsYaml.load(ICT) as PluginX;
  consoleText = '';

  ngOnInit() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.leftWidth = width / 2;
    this.topHeight = height / 2;
  }

  updateModel(event: string) {
    try {
      const ps = jsYaml.load(event);
      this.plugin = ps as PluginX;
      this.consoleText += 'Successfully updated plugin\n';
    } catch (e) {
      this.consoleText += e + '\n';
      throw e;
    } 
  }


  mouseDown(event: MouseEvent, target: string) {
    this.#resizeTarget = target;
    this.#startX = event.x;
    this.#startY = event.y;
    this.#listeners.push(
      this.#renderer.listen('document', 'mousemove', this.onMove.bind(this)),
      this.#renderer.listen('document', 'mouseup', this.onUp.bind(this))
    );
  }

  onMove(event: MouseEvent) {
    const dx = event.x - this.#startX;
    const dy = event.y - this.#startY;

    if (this.#resizeTarget === 'vertical') {
      this.leftWidth += dx;
    }
    if (this.#resizeTarget === 'horizontal') {
      this.topHeight += dy;
      console.log('topHeight', this.topHeight);
    }

    this.#startX = event.clientX;
    this.#startY = event.clientY;
  }

  onUp() {
    this.#listeners.forEach((l) => l());
    this.#listeners = [];
  }

}
