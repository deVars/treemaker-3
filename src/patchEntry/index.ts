import * as m from 'mithril'

export interface PatchEntry {
  desc: Mithril.Property<string>
  is_enabled: Mithril.Property<boolean>
  is_container_type: Mithril.Property<boolean>
  offset: Mithril.Property<string>
  value: Mithril.Property<string>
  _are_children_hidden: Mithril.Property<boolean>
  children: PatchEntry[]
  toggleEnabled: () => void
  toggleContainerType: () => void
  toggleHideChildren: () => void
}

export interface PatchEntryPOJO {
  desc: string,
  is_enabled: boolean,
  is_container_type: boolean,
  offset?: string,
  value?: string,
  _are_children_hidden: boolean,
  children?: PatchEntryPOJO[]
}

const DEFAULT_DATA: PatchEntryPOJO = {
  desc: '',
  is_container_type: false,
  is_enabled: true,
  offset: '0',
  value: '0',
  _are_children_hidden: false
};

export function patchEntryBuilder(data: PatchEntryPOJO): PatchEntry {
  if (data === undefined) {
    data = DEFAULT_DATA;
  }

  let pe: PatchEntry = {
    desc: m.prop(data.desc),
    is_enabled: m.prop(data.is_enabled),
    is_container_type: m.prop(data.is_container_type),
    offset: m.prop(data.offset),
    value: m.prop(data.value),
    _are_children_hidden: m.prop(!data.is_enabled),
    toggleEnabled: undefined,
    toggleContainerType: undefined,
    toggleHideChildren: undefined,
    children: data.children &&
      data.children.map(childData => (patchEntryBuilder(childData)))
  }

  pe.toggleEnabled = toggleEnabled;
  pe.toggleContainerType = toggleContainerType;
  pe.toggleHideChildren = toggleHideChildren;
  return pe;

  function toggleEnabled() {
    pe.is_enabled(!pe.is_enabled());
  }

  function toggleContainerType() {
    pe.is_container_type(!pe.is_container_type());
    if (!pe.is_container_type()) {
      pe.value = m.prop(DEFAULT_DATA.value);
      pe.offset = m.prop(DEFAULT_DATA.offset);
      delete pe.children;
    } else {
      delete pe.value;
      delete pe.offset;
      pe.children = [];
    }
  }

  function toggleHideChildren() {
    pe._are_children_hidden(!pe._are_children_hidden());
    m.redraw();
  }
}