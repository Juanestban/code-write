import { $ } from './JQuery'
import { useBase64 } from '../hooks/useBase64'

const { getAllHashed, getBase64ToString } = useBase64()
const $html = $('#html')
const $css = $('#css')
const $js = $('#js')

export const initializer = () => {
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
  $('iframe').setAttribute('srcdoc', htmlForPreview)
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
