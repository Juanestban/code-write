import Split from 'split-grid'
import { initializer } from './src/libs/editor'
import { $ } from './src/libs/JQuery'
import './style.css'

Split({
  minSize: 400,
  columnGutters: [
    {
      track: 1,
      element: $('.gutter-col-1'),
    },
  ],
})

Split({
  minSize: 100,
  rowGutters: [
    {
      track: 1,
      element: $('.gutter-row-1'),
    },
    {
      track: 3,
      element: $('.gutter-row-3'),
    },
  ],
})

initializer()
