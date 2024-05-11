exports.validateMongoID = function validateMongoID(mongoID) {
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(mongoID);
  }

