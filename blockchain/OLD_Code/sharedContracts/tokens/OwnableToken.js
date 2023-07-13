const shim = require("fabric-shim");
const ERC20 = require("./ERC20");
const Validator = require("../utilities/validator");
const Helper = require("../utilities/helper");

const ClientIdentity = shim.ClientIdentity;

/**
 * @title Ownable token
 * @dev The Ownable token contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
const Ownable = class extends ERC20 {
  /**
   * @dev Get owner Identity for token chaincode.
   */
  async getOwner(stub) {
    let owner = await stub.getState("owner");
    owner = Helper.defaultToUndefinedIfEmpty(owner);
    return owner;
  }

  /**
   * @dev This Function allows the current owner to
   * transfer control of the contract to a newOwner.
   */
  async transferOwnership(stub, args, thisClass) {
    const callerMspId = new ClientIdentity(stub).getMSPID();
    Validator.checkMspId(callerMspId);

    const owner = thisClass["getOwner"];
    const tokenOwnerMspId = (await owner(stub)).toString();
    Validator.checkMspId(tokenOwnerMspId);
    Validator.checkCallerIsOwner(callerMspId, tokenOwnerMspId);
    Validator.checkArgsLength(args, 1);

    const [newOwnerMspId] = args;
    Validator.isString(newOwnerMspId);
    Validator.checkMspId(newOwnerMspId);
    const newOwnerBuffer = Utils.toBuffer(newOwnerMspId);

    try {
      await stub.putState("owner", newOwnerBuffer);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }
};

module.exports = Ownable;