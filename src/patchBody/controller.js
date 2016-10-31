function PatchBodyController(config) {
  return {
    patchEntry: config.entry || {},
    patchId: config.patchId
  };
}

export default PatchBodyController;