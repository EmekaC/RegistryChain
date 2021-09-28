const shim = require("fabric-shim");
const ERC20Basic = require("./ERC20Basic");
const Validator = require("../utilities/validator");
const Helper = require("../utilities/helper");

const ClientIdentity = shim.ClientIdentity;

/**
 * @title ERC20 token
 *
 * @dev Implementation of the advanced ERC20 token features.
 */
const ERC20 = class extends ERC20Basic {
  /**
   * @dev Function to check the amount of tokens that an owner allowed to a spender.
   */
  async getAllowance(stub, args) {
    Validator.checkArgsLength(args, 2);
    const [owner, spender] = args;
    Validator.isString(owner);
    Validator.isString(spender);
    Validator.checkMspId(owner);
    Validator.checkMspId(spender);

    let allowance = await stub.getState(`${owner}-${spender}`);
    allowance = Helper.defaultToZeroIfEmpty(allowance);

    return allowance;
  }

  /**
   * @dev Approve the passed identity to spend the specified amount
   * of tokens on behalf of the function caller.
   */
  async transferFrom(stub, args, thisClass) {
    Validator.checkArgsLength(args, 3);

    let [tokenOwnerMspId, receiverMspId, value] = args;
    Validator.isString(tokenOwnerMspId);
    Validator.isString(receiverMspId);
    Validator.isString(value);
    Validator.checkMspId(tokenOwnerMspId);
    Validator.checkMspId(receiverMspId);
    Validator.isGreaterThanZero(value);

    const spenderMspId = new ClientIdentity(stub).getMSPID();
    Validator.checkMspId(spenderMspId);
    value = parseFloat(value);

    const balanceOf = thisClass["getBalanceOf"];
    const allowance = thisClass["getAllowance"];
    const promises = [
      balanceOf(stub, [tokenOwnerMspId]),
      balanceOf(stub, [receiverMspId]),
      allowance(stub, [tokenOwnerMspId, spenderMspId])
    ];
    const buffers = await Promise.all(promises);
    const [
      balanceOfTokenOwner,
      balanceOfReceiver,
      approvedAmount
    ] = buffers.map(buffer => Helper.bufferToFloat(buffer));

    Validator.checkBalance(balanceOfTokenOwner, tokenOwnerMspId);
    Validator.checkBalance(balanceOfReceiver, receiverMspId);
    Validator.checkApproved(
      approvedAmount,
      `${tokenOwnerMspId}-${spenderMspId}`
    );
    Validator.isSmallerOrEqual(value, balanceOfTokenOwner);
    Validator.isSmallerOrEqual(value, approvedAmount);

    const newOwnerBalance = Helper.toBuffer(balanceOfTokenOwner - value);
    const newReceiverBalance = Helper.toBuffer(balanceOfReceiver + value);
    const newAllowance = Helper.toBuffer(approvedAmount - value);

    try {
      await stub.putState(tokenOwnerMspId, newOwnerBalance);
      await stub.putState(`${tokenOwnerMspId}-${spenderMspId}`, newAllowance);
      await stub.putState(receiverMspId, newReceiverBalance);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }

  /**
   * @dev Approve the passed identity to spend the specified
   * amount of tokens on behalf of the function caller.
   */
  async updateApproval(stub, args) {
    Validator.checkArgsLength(args, 2);

    const [spenderMspId, value] = args;
    Validator.isString(spenderMspId);
    Validator.isString(value);
    Validator.checkMspId(spenderMspId);
    Validator.isGreaterThanZero(value);

    const callerMspId = new ClientIdentity(stub).getMSPID();
    Validator.checkMspId(callerMspId);
    const newAllowance = Helper.toBuffer(value);

    try {
      await stub.putState(`${callerMspId}-${spenderMspId}`, newAllowance);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }
};

module.exports = ERC20;