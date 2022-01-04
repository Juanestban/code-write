import { $ } from './JQuery'
import { useBase64 } from '../hooks/useBase64'
import { htmlEditor, cssEditor, jsEditor } from './monacoEditor'
import { copyCode } from './copyCode'

const { getAllHashed } = useBase64()

export const initializer = () => {
  handlerText()

  // const body = $('#app')

  // option for implement the shortcut
  /*
  body.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'Digit1') {
      console.log('another')
    }
  })
  */
}

function handlerText() {
  const html = htmlEditor.getValue()
  const css = cssEditor.getValue()
  const js = jsEditor.getValue()
  const hashed = getAllHashed({ html, css, js })
  const isWritted = html !== '' || css !== '' || js !== ''
  console.clear()
  copyCode(hashed, isWritted)

  const htmlForPreview = createHTML({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

htmlEditor.onDidChangeModelContent(handlerText)
cssEditor.onDidChangeModelContent(handlerText)
jsEditor.onDidChangeModelContent(handlerText)

function createHTML({ html = '', css = '', js = '' }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- google-fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: "Roboto", san-serif;
    }
    ${css}
  </style>
</head>
<body>
  ${html}
  <!-- scripts -->
  <script>
    ${js}
  </script>
</body>
</html>
`
}
