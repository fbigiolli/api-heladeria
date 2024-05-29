exports.validateMongoID = function validateMongoID(mongoID, anErrorDescription) {
    const regex = /^[0-9a-fA-F]{24}$/;

    if (!regex.test(mongoID)) {
      throw new Error(anErrorDescription);
    }; 
  }

