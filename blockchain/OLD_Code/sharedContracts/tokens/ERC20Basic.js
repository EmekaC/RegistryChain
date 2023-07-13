const shim = require("fabric-shim");
const Validator = require("../utilities/validator");
const Helper = require("../utilities/helper");

const ClientIdentity = shim.ClientIdentity;

/**
 * @title Basic ERC20 token
 *
 * @dev Implementation of the basic ERC20 token features.
 */
const ERC20Basic = class {
  /**
   * @dev Gets the balance of the specified identity.
   */
  async getBalanceOf(stub, args) {
    Validator.checkArgsLength(args, 1);
    Validator.checkMspId(args[0]);

    let tokenBalance = await stub.getState(args[0]);
    tokenBalance = Helper.defaultToZeroIfEmpty(tokenBalance);
    return tokenBalance;
  }

  /**
   * @dev Get total number of tokens in existence.
   */
  async getTotalSupply(stub) {
    let totalSupply = await stub.getState("totalSupply");
    totalSupply = Helper.defaultToZeroIfEmpty(totalSupply);
    return totalSupply;
  }

  /**
   * @dev Function to transfer token for a specified address.
   */
  async transfer(stub, args, thisClass) {
    Validator.checkArgsLength(args, 2);

    let [receiverMspId, value] = args;
    Validator.isString(receiverMspId);
    Validator.isString(value);
    Validator.checkMspId(receiverMspId);
    Validator.isGreaterThanZero(value);

    const senderMspId = new ClientIdentity(stub).getMSPID();
    Validator.checkMspId(senderMspId);
    value = parseFloat(value);

    const balanceOf = thisClass["getBalanceOf"];
    const balancePromises = [
      balanceOf(stub, [senderMspId]),
      balanceOf(stub, [receiverMspId])
    ];
    const balances = await Promise.all(balancePromises);
    const [balanceOfSender, balanceOfReceiver] = balances.map(buffer =>
      Helper.bufferToFloat(buffer)
    );

    Validator.checkBalance(balanceOfSender, senderMspId);
    Validator.checkBalance(balanceOfReceiver, receiverMspId);
    Validator.isSmallerOrEqual(value, balanceOfSender);

    const newSenderBalance = Helper.toBuffer(balanceOfSender - value);
    const newReceiverBalance = Helper.toBuffer(balanceOfReceiver + value);
    try {
      await stub.putState(senderMspId, newSenderBalance);
      await stub.putState(receiverMspId, newReceiverBalance);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }
};

module.exports = ERC20Basic;