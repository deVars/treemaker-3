const setClass = require('../utils/setClass');
const patchBody = require('../patchBody');

function PatchHeaderController(config) {
  function deleteEntry() {
    if (config.index !== undefined) {
      config.list.splice(config.index, 1);
    }
  }

  return {
    deleteEntry: deleteEntry,
    patchBody: patchBody,
    patchEntry: config.entry || {},
    patchEntries: config.list || [],
    patchId: +(new Date()),
    patchList: require(`../patchList`),
    setClass: setClass
  };
}

export default PatchHeaderController;