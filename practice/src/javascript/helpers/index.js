const bindEvent = (target, type, callback) => {
  target.addEventListener(type, callback);
};

export {
  bindEvent
};
