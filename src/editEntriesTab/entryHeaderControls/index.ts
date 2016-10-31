require(`./styles.scss`)

import * as m from 'mithril'
import {PatchEntryConfig} from '../'
import {PatchEntry} from '../../patchEntry'

const iconButton: Mithril.Component<Mithril.Controller> =
  require(`polythene/icon-button/icon-button`)
const toggleSwitch: Mithril.Component<Mithril.Controller> =
  require(`polythene/switch/switch`)

export const EntryHeaderControls: Mithril.Component<Mithril.Controller> = {
  controller: (config) => ({}),
  view: view
}

function view(ctrl: Mithril.Controller, config: PatchEntryConfig) {
  return m(`.entry-header-controls`, [
    m(toggleSwitch, {
      label: `${config.patchEntryData.is_enabled() ? 'Enabled': 'Disabled'}`,
      checked: config.patchEntryData.is_enabled(),
      getState: (state: {checked: boolean}) =>
        (config.patchEntryData.is_enabled(state.checked))
    }),
    m(iconButton, {
      class: `${config.patchEntryData._are_children_hidden() ? '': 'colored'}`,
      content: m(`i.fa.fa-eye${config.patchEntryData._are_children_hidden() ?
        '-slash': ''}`),
      events: {
        onclick: () => {config.patchEntryData.toggleHideChildren()}
      }
    }),
    m(iconButton, {
      class: 'set-width',
      content: m(`i.fa.${config.patchEntryData.is_container_type() ?
        'fa-list': 'fa-angle-double-right'}`),
      events: {
        onclick: () => {config.patchEntryData.toggleContainerType()}
      }
    }),
    m(iconButton, {
      content: m(`i.fa.fa-trash`),
      events: {
        onclick: () => {config.patchList.splice(config.patchIndex, 1)}
      }
    })
  ])
}