import { $ } from './JQuery'

export function copyCode(path, isWrited) {
  const button = $('#export-button')
  const wrapperText = $('#is-copied')
  const finalUrl = `${location.origin}/${path}`

  if (isWrited) {
    button.removeAttribute('disabled')
    button.onclick = () => {
      navigator.clipboard.writeText(finalUrl)
      wrapperText.style.display = 'block'

      setTimeout(() => {
        wrapperText.style.display = 'none'
      }, 2000)
    }
    return
  }

  button.setAttribute('disabled', 'true')
}
