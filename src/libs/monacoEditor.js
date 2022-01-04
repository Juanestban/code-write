import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import { useBase64 } from '../hooks/useBase64'
import { $ } from './JQuery'

const { /*getAllHashed,*/ getBase64ToString } = useBase64()
const { pathname } = window.location
const pathArray = pathname.split('***')
const [html, css, js] = getBase64ToString(pathArray)

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'css') return new cssWorker()
    if (label === 'html') return new htmlWorker()
    if (label === 'javascript') return new tsWorker()

    return new editorWorker()
  },
}

const attributesEditor = {
  theme: 'vs-dark',
  automaticLayout: true,
  fontSize: 16,
  tabCompletion: 'on',
  minimap: {
    enabled: false,
  },
}

const htmlEditor = monaco.editor.create($('#html'), {
  value: html === undefined ? '' : html,
  language: 'html',
  ...attributesEditor,
})

const cssEditor = monaco.editor.create($('#css'), {
  value: css === undefined ? '' : css,
  language: 'css',
  ...attributesEditor,
})

const jsEditor = monaco.editor.create($('#javascript'), {
  value: js === undefined ? '' : js,
  language: 'javascript',
  ...attributesEditor,
})

export { htmlEditor, cssEditor, jsEditor }
