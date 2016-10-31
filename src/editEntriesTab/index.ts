require(`./styles.scss`)

import * as m from 'mithril'

import {PatchEntry} from '../patchEntry'
import {TabComponentConfig} from '../app'
import {PatchList} from './patchList'

export interface PatchEntryConfig {
  patchEntryData: PatchEntry
  patchList: PatchEntry[],
  patchIndex: number
}

export const EditEntriesTab: Mithril.Component<Mithril.Controller> = {
  controller: (config) => ({}),
  view: view
}

function view(ctrl: Mithril.Controller, config: TabComponentConfig) {
  return m(`.edit-entries-tab`,
    m(PatchList, {patchEntryData: config.patchEntryData})
  )
}