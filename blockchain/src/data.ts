import TerminologyRegistry from "./interface";
import {uuid} from 'uuidv4'

const initData: TerminologyRegistry = {
    // id: (uuid() as string),
    id: '1',
    identifier: "string",
    // identifier: {
    //     use: 'Official',
    //     type: 'brooklyn',
    //     system: "snomedct",
    //     value: "ubrukutu",
    //     period: {
    //         start: new Date(),
    //         end: new Date()
    //     }
    // },
    link: "https://nameksolutions.com/terminology_registry",
    // type: {
    //     coding: [{
    //         system: "snomedct",
    //         version: 1.0,
    //         display: "SNOMEDCT",
    //         userSelected: true,
    //         code: "hello"
    //     }],
    //     text: 'value set'
    // },
    type: "stringtype",
    codeSystem: "value mean",
    entry: "positive entry",
    signature: "Nameksolutionsinc",
    timestamp: "today",
    // timestamp: new Date(),
    total: 83,
}

export {initData};