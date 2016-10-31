require(`./styles/index.scss`)
require(`polythene/layout/theme/theme`)

import * as m from 'mithril'
import {App} from './app'

const BODY:Element = window.document.body

m.route.mode = "hash"
m.route(BODY, `/`, {
  '/': App,
  '/:name': App,
  '/:name/:sub...': App
})
