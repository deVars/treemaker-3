const m = require(`mithril`);

export const PreviewTab: Mithril.Component<Mithril.Controller> = {
  controller: (config) => {
    m.redraw.strategy('diff');
    return {}
  },
  view: view
}

function view(ctrl: Mithril.Controller, config: any) {
  return m('.preview-tab', [
    m('pre', JSON.stringify(config.patchEntryData, undefined, 2))
  ])
}