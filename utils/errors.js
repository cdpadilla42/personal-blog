exports.makeSafe = (fn) => {
  return function () {
    fn().catch(errorHandler);
  };
};

exports.errorHandler = (e) => console.error(e);
