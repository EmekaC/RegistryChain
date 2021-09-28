const shim = require("fabric-shim");
const JoinMintToken = require("./JoinMintToken");
const Validator = require("../utilities/validator");
const Helper = require("../utilities/helper");

const ClientIdentity = shim.ClientIdentity;

/**
 * @title ERC20Detailed token
 * @dev The decimals are only for visualization purposes.
 * All the operations are done using the smallest and indivisible token unit.
 */
class ERC20Detailed extends MintableToken {
  /**
   * @dev Get name of token.
   */
  async getName(stub) {
    let name = await stub.getState("name");
    name = Helper.defaultToUndefinedIfEmpty(name);
    return name;
  }

  /**
   * @dev Get symbol of token.
   */
  async getSymbol(stub) {
    let symbol = await stub.getState("symbol");
    symbol = Helper.defaultToUndefinedIfEmpty(symbol);
    return symbol;
  }

  /**
   * @dev Function to update token symbol.
   */
  async updateTokenSymbol(stub, args, thisClass) {
    const callerMspId = new ClientIdentity(stub).getMSPID();
    Validator.checkMspId(callerMspId);

    const owner = thisClass["getOwner"];
    const tokenOwnerMspId = (await owner(stub)).toString();
    Validator.checkMspId(tokenOwnerMspId);
    Validator.checkCallerIsOwner(callerMspId, tokenOwnerMspId);
    Validator.checkArgsLength(args, 1);
    const [newTokenSymbol] = args;
    Validator.isString(newTokenSymbol);
    const tokenSymbolBuffer = Helper.toBuffer(newTokenSymbol);

    try {
      await stub.putState("symbol", tokenSymbolBuffer);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }

  /**
   * @dev Function to update token name.
   */
  async updateTokenName(stub, args, thisClass) {
    const callerMspId = new ClientIdentity(stub).getMSPID();
    Validator.checkMspId(callerMspId);

    const owner = thisClass["getOwner"];
    const tokenOwnerMspId = (await owner(stub)).toString();
    Validator.checkMspId(tokenOwnerMspId);
    Validator.checkCallerIsOwner(callerMspId, tokenOwnerMspId);
    Validator.checkArgsLength(args, 1);
    const [newTokenName] = args;
    Validator.isString(newTokenName);
    const tokenNameBuffer = Helper.toBuffer(newTokenName);

    try {
      await stub.putState("name", tokenNameBuffer);
    } catch (error) {
      throw new Error(`Failed to update state. Error: ${error}`);
    }
  }
}

module.exports = ERC20Detailed;