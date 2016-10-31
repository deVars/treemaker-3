require(`./styles.scss`)

import * as m from 'mithril'
import {Tools} from './helper'

const listTile: Mithril.Component<Mithril.Controller> =
  require('polythene/list-tile/list-tile')
const textField: Mithril.Component<Mithril.Controller> =
  require(`polythene/textfield/textfield`)
const card: Mithril.Component<Mithril.Controller> =
  require(`polythene/card/card`)

const PATTERN: string = '[A-Fa-f0-9]+';

interface ToolsController extends Mithril.Controller {
  r1: Mithril.Property<string>
  r2: Mithril.Property<string>
  r3: Mithril.Property<string>
  res: Mithril.Property<string>
}

export const ToolsTab: Mithril.Component<ToolsController> = {
  controller: (config) => ({
    r1: m.prop(''),
    r2: m.prop(''),
    r3: m.prop(''),
    res: m.prop('')
  }),
  view: view
}

function view(ctrl: ToolsController, config: any) {
  return m(`.tools-tab`, [
    m('.tools-tab--links__container', TOOLS_LINKS),
    m('.tools-tab--tool.flex', m.route.param(`sub`) !== undefined ? [
      m(textField, {
        class: 'address',
        help: `${m.route.param(`sub`).indexOf('2r') !== -1 ? 'Rd': 'Offset Destination'}`,
        pattern: `${m.route.param(`sub`).indexOf('2r') !== -1 ? '(R|r)[0-7]': PATTERN}`,
        dense: true,
        maxlength: 6,
        value: ctrl.r1,
        events: {
          onblur: (e: any) => {
            ctrl.r1(e.target.value)
            Tools[m.route.param(`sub`)](ctrl.r1, ctrl.r2, ctrl.r3, ctrl.res)
          }
        }
      }),
      m(textField, {
        class: 'address',
        help: `${m.route.param(`sub`).indexOf('2r') !== -1 ? 'Rs': 'Offset Source'}`,
        pattern: `${m.route.param(`sub`).indexOf('2r') !== -1 ? '(R|r)[0-7]': PATTERN}`,
        dense: true,
        maxlength: 6,
        value: ctrl.r2,
        events: {
          onblur: (e: any) => {
            ctrl.r2(e.target.value)
            Tools[m.route.param(`sub`)](ctrl.r1, ctrl.r2, ctrl.r3, ctrl.res)
          }
        }
      }),
      m.route.param(`sub`).indexOf('2ri') !== -1 ? m(textField, {
        class: 'address',
        help: 'Immediate',
        dense: true,
        maxlength: 6,
        value: ctrl.r3,
        events: {
          onblur: (e: any) => {
            ctrl.r3(e.target.value)
            Tools[m.route.param(`sub`)](ctrl.r1, ctrl.r2, ctrl.r3, ctrl.res)
          }
        }
      }): undefined,
      m(card, {
        content: [{
          text: {
            content: `Result: ${ctrl.res().replace(/([A-Fa-f0-9]{1,2})/g, "$1 ")}`
          }
        }]
      })
    ] : 'Please select a tool from the left')
  ])
}


const TOOLS_LINKS = [
  m(listTile, {
    class: `tools-tab--links`,
    title: `MOV Rd, Rs`,
    subtitle: `MOV with two registers`,
    ink: true,
    url: {
      href: `/tools/mov2r`,
      config: m.route
    }
  }),
  m(listTile, {
    class: `tools-tab--links`,
    title: `LSL Rd, Rs, Imm`,
    subtitle: `Logical left shift Rs Imm times`,
    ink: true,
    url: {
      href: `/tools/lsl2ri`,
      config: m.route
    }
  }),
  m(listTile, {
    class: `tools-tab--links`,
    title: `LSR Rd, Rs, Imm`,
    subtitle: `Logical right shift Rs Imm times`,
    ink: true,
    url: {
      href: `/tools/lsr2ri`,
      config: m.route
    }
  }),
  m(listTile, {
    class: `tools-tab--links`,
    title: `CMP R2, R1`,
    subtitle: `Compare two registers`,
    ink: true,
    url: {
      href: `/tools/cmp2r`,
      config: m.route
    }
  }),
  m(listTile, {
    class: `tools-tab--links`,
    title: `OFFs BL OFFd`,
    subtitle: `Branch link to OFFd from OFFs`,
    ink: true,
    url: {
      href: `/tools/bl2offs`,
      config: m.route
    }
  })
]
