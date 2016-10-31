import * as m from 'mithril'

import {PatchEntryConfig} from '../'
import {EntryHeaderControls} from '../entryHeaderControls'
import {EntryValueFields} from '../entryValueFields'
import {PatchList} from '../patchList'

const textField: Mithril.Component<Mithril.Controller> =
  require(`polythene/textfield/textfield`)

export const PatchListEntry: Mithril.Component<Mithril.Controller> = {
  controller: (config) => ({}),
  view: view
}

function view(ctrl: Mithril.Controller, config: PatchEntryConfig) {
  return m('.patch-entry',[
    m('.patch-entry--header', [
      m(EntryHeaderControls, {
          patchEntryData: config.patchEntryData,
          patchList: config.patchList,
          patchIndex: config.patchIndex
        }),
      m(textField, {
        class: 'description flex',
        label: `Description`,
        dense: true,
        value: () => (config.patchEntryData.desc()),
        events: {
          onblur: (e: any) => (config.patchEntryData.desc(e.target.value))
        }
      })
    ]),
    config.patchEntryData._are_children_hidden() ?
      m('.hidden') :
      m('.patch-entry--body',
        config.patchEntryData.is_container_type() ?
          m(PatchList, {patchEntryData: config.patchEntryData.children}) :
          m(EntryValueFields, {patchEntryData: config.patchEntryData})
      )
  ])
}