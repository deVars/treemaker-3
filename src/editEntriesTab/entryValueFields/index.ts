require(`./styles.scss`)

import * as m from 'mithril'

import {PatchEntryConfig} from '../'

const textField: Mithril.Component<Mithril.Controller> =
  require(`polythene/textfield/textfield`)
const card: Mithril.Component<Mithril.Controller> =
  require(`polythene/card/card`)

const PATTERN: string = '[A-Fa-f0-9]+';

export const EntryValueFields: Mithril.Component<Mithril.Controller> = {
  controller: (config) => ({}),
  view: view
}

function view(ctrl: Mithril.Controller, config: PatchEntryConfig) {
  return m('.entry-value-fields', [
    m('.offset', [
      m(textField, {
        class: 'address',
        label: `Offset`,
        help: 'Omit 0x prefix',
        pattern: PATTERN,
        dense: true,
        maxlength: 6,
        required: true,
        value: () => (config.patchEntryData.offset()),
        events: {
          onblur: (e: any) => (config.patchEntryData.offset(e.target.value))
        }
      }),
      m(textField, {
        class: 'value flex',
        label: `Value`,
        help: 'Hex values (no spaces)',
        pattern: PATTERN,
        dense: true,
        required: true,
        value: () => (config.patchEntryData.value()),
        events: {
          onblur: (e: any) => (config.patchEntryData.value(e.target.value)),
          oninput: (e: any) => (config.patchEntryData.value(e.target.value))
        }
      })
    ]),
    m('.preview', [
      m(card, {
        content: [{
          text: {
            content: config.patchEntryData.value() ?
              config.patchEntryData.value().replace(/([A-Fa-f0-9]{1,2})/g, "$1 ") :
              "N/A"
          }
        }]
      })
    ])
  ])
}