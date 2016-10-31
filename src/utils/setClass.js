function setClass(config) {
  let classMap = [];
  Object.keys(config)
    .forEach(key => {
      if (config[key] === true) {
        classMap.push(key);
      }
    });

  return classMap.join(' ');
}

export default setClass;