const patchHeader = require(`../patchHeader`);
const PatchEntry = require(`../patchEntry`);

function PatchListController(args) {
  let ctrl = this;

  ctrl.list = args.list || [];
  ctrl.patchHeader = patchHeader;
  ctrl.addEntry = addEntry;


  function addEntry() {
    ctrl.list.push(new PatchEntry());
  }
}

export default PatchListController;