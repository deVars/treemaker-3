import * as m from 'mithril'

import {TabComponentConfig} from '../../app'
import {PatchListEntry} from '../patchListEntry'
import {patchEntryBuilder} from '../../patchEntry'

const iconButton: Mithril.Component<Mithril.Controller> =
  require(`polythene/icon-button/icon-button`)

export const PatchList: Mithril.Component<Mithril.Controller> = {
  controller: (config) => ({}),
  view: view
}

function view(ctrl: Mithril.Controller, config: TabComponentConfig) {
  if (config.patchEntryData === undefined) {
    return m('.patch-list-not-defined')
  }
  return m('.patch-list', [
    config.patchEntryData.map(
      (patchEntry, index, list) => (
        m(PatchListEntry, {
          key: index,
          patchEntryData: patchEntry,
          patchList: list,
          patchIndex: index
        })
      )
    ),
    m(iconButton, {
      content: m('i.fa.fa-plus'),
      events: {
        onclick: () => {config.patchEntryData.push(patchEntryBuilder(undefined))}
      }
    })
  ])
}