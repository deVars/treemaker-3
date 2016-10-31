import * as m from 'mithril'

export const DEFAULT_ROUTES: string[] = [
  `entries`,
  `preview`,
  `tools`
]

export const ROUTE_TABS = [
  {
    label: `Edit Entries`,
    url: {
      href: `/${DEFAULT_ROUTES[0]}`,
      config: m.route
    }
  }, {
    label: `Preview`,
    url: {
      href: `/${DEFAULT_ROUTES[1]}`,
      config: m.route
    }
  }, {
    label: `Tools`,
    url: {
      href: `/${DEFAULT_ROUTES[2]}`,
      config: m.route
    }
  }
]
