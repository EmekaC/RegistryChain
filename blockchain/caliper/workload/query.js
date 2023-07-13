'use strict';
const fs = require("fs");
const csvParser = require("csv-parser");

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }
    async submitTransaction() {
        const randomId = Math.floor(Math.random()*this.roundArguments.assets);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'query',
            invokerIdentity: 'User1',
            // contractArguments: [`${this.workerIndex}_${randomId}`],
            contractArguments: ['4997'],
            readOnly: true
        };

        await this.sutAdapter.sendRequests(myArgs);
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;