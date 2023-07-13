/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const data  = {
    id: '',
    identifier: {
        use: 'Official',
        type: 'brooklyn',
        system: "snomedct",
        value: "ubrukutu",
        period: {
            start: new Date(),
            end: new Date()
        }
    },
    link: "https://nameksolutions.com/terminology_registry",
    type: {
        coding: [{
            system: "snomedct",
            version: 1.0,
            display: "SNOMEDCT",
            userSelected: true,
            code: "hello"
        }],
        text: 'value set'
    },
    codeSystem: "value mean",
    entry: "positive entry",
    signature: "Nameksolutionsinc",
    timestamp: new Date(),
    total: 83
}

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..',  'config', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('terminology_registry_chaincode');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        for(var i = 7731; i<10000; i++) {
            data.id = `${i}`
            const x = JSON.stringify(data)
            await contract.submitTransaction('create', x);
            console.log('Transaction has been submitted');
        }

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
