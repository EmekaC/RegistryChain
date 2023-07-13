const path = require('path');
const fs = require('fs')
const { Wallets, Gateway } = require('fabric-network');

async function main () {
try {
    const gateway = new Gateway();
    const user = 'user_3'
    const walletPath = path.resolve(process.cwd(), 'wallet');
    
    const wallet = await Wallets.newFileSystemWallet(walletPath)
    console.log(wallet)
    
    const ccpPath = path.resolve(__dirname, '..', 'config', 'connection-org2.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const ccpOptions = {
    identity: user,
    wallet: wallet,
    discovery: { enabled: true, asLocalhost: true }
    };

     // Check to see if we've already enrolled the user.
     let identity = await wallet.get(user);
     if (!identity) {
        //  console.log(`An identity for the user ${user} does not exist in the wallet, so registering user`);
        //  await helper.getRegisteredUser(user, org_name, true)
        //  identity = await wallet.get(user);
        //  console.log('Run the registerUser.js application before retrying');
         return 'user not found';
     }
    
    await gateway.connect(ccp, ccpOptions);
    
    const network = await gateway.getNetwork('test')
    const contract = await network.getContract('cura')
    const response = await contract.evaluateTransaction('queryAllPersonnels')
    
    console.log(response.toString()) 
} catch (error) {
    console.log(error)
}
}


main()