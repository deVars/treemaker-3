const m = require(`mithril`);
const PatchEntry = require(`../patchEntry`);

function StoreService() {
  let svc = {},
      url,
      data = [],
      test_data = [];

  if (DEV_MODE) {
    test_data = require(`../../test_data.json`);
  }

  svc.init = init;
  svc.getData = getData;
  svc.loadFile = loadFile;
  svc.getDataURL = getDataURL;
  svc.generateDataURL = generateDataURL;
  svc.exportFilename = m.prop('export.json');
  return svc;

  function init() {
    data.length = 0;
    data.push(...load(test_data));
  }

  function getData() {
    return data;
  }

  function getDataURL() {
    return url;
  }

  function load(patchList) {
    return patchList.map(entry => new PatchEntry(entry));
  }

  function loadFile(changeEvent) {
    if (changeEvent.target === undefined) {
      return;
    }

    let fileEl = changeEvent.target,
        dataFile = fileEl.files[0],
        fileReader = new window.FileReader();
    fileReader.onload = event => {
      m.startComputation();
      data.push(...load(JSON.parse(event.target.result)));
      m.endComputation();
    };
    data.length = 0;
    fileReader.readAsText(dataFile);
  }

  function generateDataURL() {
    let blobParts = [JSON.stringify(data, undefined, 2)],
        blob = new window.Blob(blobParts, {type: `application/octet-stream`});
    if (url) {
      window.URL.revokeObjectURL(url);
    }
    url = window.URL.createObjectURL(blob);
  }
}

export default StoreService();