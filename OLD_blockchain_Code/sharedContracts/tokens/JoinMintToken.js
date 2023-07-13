const shim = require("fabric-shim");
const OwnableToken = require("./OwnableToken");
const Validator = require("../utilities/validator");
const Helper = require("../utilities/helper");

const ClientIdentity = shim.ClientIdentity;

/**
 * @title Mintable token
 * @dev Simple ERC20 Token example, with mintable token creation
 */
const JoinMintToken = class extends OwnableToken {
  /**
   * @dev Whether minting is allowed or not
   */
  async isMintingAllowed(stub) {
    let _isMintingAllowed = await stub.getState("isMintingAllowed");
    _isMintingAllowed = Helper.defaultToUndefinedIfEmpty(_isMintingAllowed);
    return _isMintingAllowed;
  }

  /**
   * @dev Function to Update MintingState
   */
  async updateMintingState(stub, args, thisClass) {
    const callerMspId = new ClientIdentity(stub).getMSPID();
    Validator.checkMspId(callerMspId);

    const owner = thisClass["getOwner"];
    const tokenOwnerMspId = (await owner(stub)).toString();
    Validator.checkMspId(tokenOwnerMspId);
    Validator.checkCallerIsOwner(callerMspId, tokenOwnerMspId);

    Validator.checkArgsLength(args, 1);
    const [bool] = args;
    Validator.isString(bool);
    Validator.isTrueOrFalse(bool);
    const newMintingState = Utils.toBuffer(bool);

    try {
      await stub.putState("isMintingAllowed", newMintingState);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }

  /**
   * @dev Function to mint tokens
   */
  async mint(stub, args, thisClass) {
    const isMintingAllowed = thisClass["isMintingAllowed"];
    const _isMintingAllowed = (await isMintingAllowed(stub)).toString();
    Validator.isMintingTrue(_isMintingAllowed);

    const callerMspId = new ClientIdentity(stub).getMSPID();
    Validator.checkMspId(callerMspId);

    const owner = thisClass["getOwner"];
    const tokenOwnerMspId = (await owner(stub)).toString();
    Validator.checkMspId(tokenOwnerMspId);
    Validator.checkCallerIsOwner(callerMspId, tokenOwnerMspId);
    Validator.checkArgsLength(args, 2);

    let [toMspId, value] = args;
    Validator.isString(toMspId);
    Validator.checkMspId(toMspId);
    Validator.isString(value);
    Validator.isGreaterThanZero(value);
    value = parseFloat(value);

    const balanceOf = thisClass["getBalanceOf"];
    const totalSupply = thisClass["getTotalSupply"];
    const promises = [balanceOf(stub, [toMspId]), totalSupply(stub)];
    const buffers = await Promise.all(promises);
    const [balanceOfTo, _totalSupply] = buffers.map(buffer =>
      Helper.bufferToFloat(buffer)
    );

    Validator.checkBalance(balanceOfTo);
    Validator.checkTotalSupply(_totalSupply);

    const newTotalSupply = Helper.toBuffer(_totalSupply + value);
    const newBalance = Helper.toBuffer(balanceOfTo + value);

    try {
      await stub.putState("totalSupply", newTotalSupply);
      await stub.putState(toMspId, newBalance);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }
};

module.exports = JoinMintToken;