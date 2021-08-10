import './style.css'
import Split from 'split-grid'
import { useBase64 } from './src/hooks/useBase64'

const $getEl = (selector) => document.querySelector(selector)
const { getAllHashed, getBase64ToString } = useBase64()
const $html = $getEl('#html')
const $css = $getEl('#css')
const $js = $getEl('#js')

const initializer = () => {
  const { pathname } = window.location
  const pathArray = pathname.split('***')
  const [html, css, js] = getBase64ToString(pathArray)
  $html.value = html === undefined ? '' : html
  $css.value = css === undefined ? '' : css
  $js.value = js === undefined ? '' : js
  handlerText()
}

function handlerText() {
  const html = $html.value
  const css = $css.value
  const js = $js.value
  const hashed = getAllHashed({ html, css, js })
  console.clear()
  console.log(`http://localhost:3000/${hashed}`)

  const htmlForPreview = createHTML({ html, css, js })
  $getEl('iframe').setAttribute('srcdoc', htmlForPreview)
}

$html.addEventListener('input', handlerText)
$css.addEventListener('input', handlerText)
$js.addEventListener('input', handlerText)

function createHTML({ html, css, js }) {
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

Split({
  minSize: 400,
  columnGutters: [
    {
      track: 1,
      element: document.querySelector('.gutter-col-1'),
    },
  ],
})

initializer()
