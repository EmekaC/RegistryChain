'use strict';
const fs = require("fs");
const csvParser = require("csv-parser");

var data  = {
    id: '1',
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

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async submitTransaction() {
            // for(var i; i < this.roundArguments.assets; i++) {
                // for(var i; i < 3; i++) {
                const assetID = `${this.workerIndex}`;
                // const assetID = `${this.workerIndex}_${i}`;
                console.log(`Worker ${this.workerIndex}: Creating asset ${assetID}`);
                data.id = assetID
                const val = JSON.stringify(data)
                const request = {
                    contractId: this.roundArguments.contractId,
                    contractFunction: 'create',
                    invokerIdentity: 'User',
                    contractArguments: [val],
                    readOnly: false
                };
    
                await this.sutAdapter.sendRequests(request);
            // }
    }

}

function createWorkloadModule() {
    return new MyWorkload();
}


module.exports.createWorkloadModule = createWorkloadModule;