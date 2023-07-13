interface Identifier {
    use: string,
    type: string,
    system: string,
    value: string,
    period: Period,

}

interface Period {
    start: Date,
    end: Date
}

interface Coding {
    system: string,
    version: number,
    code: string,
    display: string,
    userSelected: boolean
}

interface CodeableConcept {
    coding: Coding[],
    text: string,
}


export default interface TerminologyRegistry {
    timestamp: string,
    // timestamp: Date,
    id: string,
    total: number,
    // type: CodeableConcept,
    type: string,
    link: string,
    signature: string,
    identifier: string,
    // identifier: Identifier,
    codeSystem: string,
    entry: string,
}
