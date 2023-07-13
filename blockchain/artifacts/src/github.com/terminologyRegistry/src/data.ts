import TerminologyRegistry from "./interface";
import {uuid} from 'uuidv4'

const initData: TerminologyRegistry = {
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
    total: 83,
}

export {initData};