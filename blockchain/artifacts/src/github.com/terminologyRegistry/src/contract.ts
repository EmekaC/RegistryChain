/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from 'fabric-contract-api';
import { initData } from './data';
import ITerminologyRegistry from './interface';

export class TerminologyRegistry extends Contract {

    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
            const res = await ctx.stub.putState('62f618fdfcaeea169cc835c1', Buffer.from(JSON.stringify(initData)));
            console.info('Added <--> ', res);
        console.info('============= END : Initialize Ledger ===========');
    }

    public async query(ctx: Context, id: string): Promise<string> {
        const dataAsBytes = await ctx.stub.getState(id);
        if (!dataAsBytes || dataAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        } 
        console.log(dataAsBytes.toString());
        return dataAsBytes.toString();
    }

    public async create(ctx: Context, value: string) {
        console.info('============= START : Create data ===========');

        const val: ITerminologyRegistry = JSON.parse(value);

        const data: ITerminologyRegistry = {
            timestamp: val.timestamp,
            id: val.id,
            total: val.total,
            type: val.type,
            link: val.link,
            signature: val.signature,
            identifier: val.identifier,
            codeSystem: val.codeSystem,
            entry: val.entry,
        };

       const res = await ctx.stub.putState(val.id, Buffer.from(JSON.stringify(data)));
        console.info('============= END : Create data ===========');
        console.info(res);
        return JSON.stringify(res);
    }

    public async queryAll(ctx: Context): Promise<string> {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

}
