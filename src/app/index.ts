require(`./styles.scss`)

import * as m from 'mithril'

import {DEFAULT_ROUTES, ROUTE_TABS} from './constants'
import {PatchEntry, patchEntryBuilder} from '../patchEntry'
import {EditEntriesTab} from '../editEntriesTab'
import {PreviewTab} from '../previewTab'
import {ToolsTab} from '../toolsTab'

import {MapOf} from '../utils/map'

declare const DEV_MODE: boolean

const button: Mithril.Component<Mithril.Controller> =
  require(`polythene/button/button`)
const dialog: any =
  require(`polythene/dialog/dialog`)
const headerPanel: Mithril.Component<Mithril.Controller> =
  require(`polythene/header-panel/header-panel`)
const iconButton: Mithril.Component<Mithril.Controller> =
  require(`polythene/icon-button/icon-button`)
const tabs: Mithril.Component<Mithril.Controller> =
  require(`polythene/tabs/tabs`)
const textField: Mithril.Component<Mithril.Controller> =
  require(`polythene/textfield/textfield`)

export interface TabComponentConfig {
  patchEntryData: PatchEntry[]
}

interface AppController extends Mithril.Controller {
  getSelectedIndex: () => number,
  getTabComponent: () => Mithril.Component<Mithril.Controller>
}

// This is the main data for the patches
let patchEntryData: PatchEntry[] = [],
    saveFileName: Mithril.Property<string> = m.prop('patchList'),
    url: Mithril.Property<string> = m.prop('')

if (DEV_MODE === true) {
  let jsonData: any[] = require(`../../test_data.json`)
  patchEntryData = jsonData.map(entry => patchEntryBuilder(entry))
}

export const App: Mithril.Component<AppController> = {
  controller: (config) => {
    m.redraw.strategy('diff')
    return {
      getSelectedIndex: () => {
        let index = DEFAULT_ROUTES.indexOf(m.route.param(`name`))
        return index > -1 ? index : 0
      },
      getTabComponent: () => {
        let tabRoutes: MapOf<Mithril.Component<Mithril.Controller>> = {},
            components: Mithril.Component<Mithril.Controller>[] =
              [EditEntriesTab, PreviewTab, ToolsTab]

        components.forEach((tabComponent, index) => {
          tabRoutes[DEFAULT_ROUTES[index]] = tabComponent
        })

        return tabRoutes[m.route.param(`name`) || DEFAULT_ROUTES[0]]
      }
    }
  },
  view: view
}

function view(ctrl: AppController, config: any) {
  return m('.app', [
    m(headerPanel, {
      class: `header-panel--fit header-panel`,
      mode: `waterfall`,
      fixed: true,
      header: {
        toolbar: {
          mode: `standard`,
          topBar: m('.header-panel--title-bar', [
            m('span.flex.header-panel--title-bar__text', 'Simple Patcher Tree Maker'),
            m(iconButton, {
              content: m('i.fa.fa-upload'),
              events: {
                onclick: () => {document.getElementById('fileLoader').click()}
              }
            }),
            m(iconButton, {
              content: m('i.fa.fa-download'),
              events: {
                onclick: () => {showSaveDialog()}
              }
            })
          ])
        }
      },
      content: [
        m('.tabs',
          m(tabs, {
            class: `header-tabs`,
            autofit: true,
            activeSelected: true,
            selectedTab: ctrl.getSelectedIndex(),
            buttons: ROUTE_TABS
          })
        ),
        m('.content', [
          m(ctrl.getTabComponent(), {patchEntryData: patchEntryData})
        ])
      ]
    }),
    m('input#fileLoader.hidden', {
      type: 'file',
      multiple: false,
      accept: 'application/json',
      onchange: (ev: any) => {loadFile(ev)}
    }),
    m('a#fileWriter.hidden', {
      download: saveFileName(),
      href: url()
    }),
    m(dialog)
  ])
}

function loadFile(changeEvent: Event) {
  if (changeEvent.target === undefined) {
    return
  }

  let fileEl: any = changeEvent.target,
      dataFile = fileEl.files[0],
      fileReader: FileReader = new FileReader(),
      jsonData: any[]

  fileReader.onload = event => {
    let evTarget: any = event.target
    jsonData = JSON.parse(evTarget.result)
    patchEntryData = jsonData.map(entry => patchEntryBuilder(entry))
  }

  fileReader.readAsText(dataFile)
}

function showSaveDialog() {
  let tempFileName:string = saveFileName().split('.')[0]
  dialog.show({
    body: m('.save-dialog--body', [
      m('.save-dialog--body__prompt', `Enter file name to save:`),
      m(textField, {
        class: 'address',
        label: `filename`,
        help: 'A prefix of .json will be automatically appended',
        focusState: true,
        focusHelp: true,
        dense: true,
        required: true,
        value: tempFileName,
        events: {
          onblur: (e: any) => {tempFileName = `${e.target.value}`}
        }
      })
    ]),
    footer: [
      m(button, {
        label: `Cancel`,
        events: {
          onclick: () => {dialog.hide()}
        }
      }),
      m(button, {
        label: `Save`,
        events: {
          onclick: () => {
            saveFileName(`${tempFileName}.json`)
            document.getElementById('fileWriter').click()
            dialog.hide()
          }
        }
      })
    ],
    modal: true,
    backdrop: true
  })
  generateDataURL()
}

function generateDataURL() {
  let blobParts = [JSON.stringify(patchEntryData, undefined, 2)],
      blob = new window.Blob(blobParts, {type: `application/octet-stream`})

  if (url() !== '') {
    window.URL.revokeObjectURL(url())
  }
  url(window.URL.createObjectURL(blob))
}
