const m = require(`mithril`);

export const ToolsTab: Mithril.Component<Mithril.Controller> = {
  controller: (config) => ({}),
  view: view
}

function view(ctrl: Mithril.Controller, config: any) {
  return m('.tools-tab', 'Tools Tab')
}