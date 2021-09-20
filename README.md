# RegistryChain README #
Repository for thesis submitted to Department of Computer Information Systems (CIS), University of Malta.



This is **RegistryChain**'s repository, a novel multi-stakeholder framework for *health workforce*, *health facility*, *terminology*, and *Patient repository* information change management.

The framework is implemented using Hyperledger Fabric open source enterprise blockchain using [Node.js](https://nodejs.org/en/).
The data is formated and structured using HL7 [FHIR](https://www.hl7.org/fhir/) bundles.

You can use this repository to bootstrap your own copy of **RegistryChain** network, leverage the [ERC20](https://en.wikipedia.org/wiki/Ethereum#ERC-20_Tokens) fungible token model for healthcare assets.
The tokens allow for Minting and transfers within network members. Resources are tokenized by the transaction data size, node uptime, and general organization availability reputation.

>NOTE: This repository assumes familiarity with [FHIR](https://www.hl7.org/fhir) profiling, its ValueSets, and CodeableConcept resources.
>Understanding of Hyperledger Fabric prerequisites and basic concepts including those of blockchain, smart contracts, and chaincodes.

### Getting Started ###
The following dependencies are necessary to run the code in this repository.

* FHIR: R4.01
* Node: v10.15
* Hyperledger fabric: v2.3.2
* Docker: 20.10.0
* Go: go1.15.7
* CouchDB: v3.1.1

## How do I get set up? ##
This is how to run a code `npm install` function.
~~text struckthrough~~


### Hyperledger fabric architectural components (YAML binaries) ###
Core components  | Tools and Utilities  |  Fabric Certification Authority
---------------- | :------------------- | :--------------------------
Peer ( tagged as anchor/Leader) | configtxgen          | Client CA
Orderer          | configtxlator        | Server CA
Admin device     | cryptogen            |

### Description of Binaries ###
Binary (in YAML) | Description
---------------- | :-------------------
Peer             | Peers are configured using the core.yaml file; Launched as process to become a network node; Can be tagged as Anchor or Leader; Can be used to manage network and channel config.
Orderer          | Orderers can be configured using orderer.yaml file; Used to configure nodes responsible for block creation and replication.
configtxgen      | Used to generate network config with configtx.yaml file; Used to manage network and channel configs through a peer.
configtxlator    | Used to translate between the protocol-buffer (used by grpc) and JSON.
cryptogen        | Used to generate crypto material for testing.
fabric-ca-server | A standalone process that exposes services for managing identities and certificates.
fabric-ca-client | A CLI tool for executing identity/certificate management services on a CA server.


### Other important Hyperledger frameworks ###
Framework name  | Description
---------------- | :-------------------
Caliper          | Used for blockchain benchmarking
Composer         | Used for blockchain network design

### Hardware requirement ###
* Windows, Ubuntu Linix 18.04 LTS, Mac OS 10.12
* 6GB RAM minimum

### Setting up a node ###
* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Setting up a the network and Channel ###

### Roles to consider for each organization ###
* CA (Identitty management organization)
* CA node within an organization
* Transaction endorsement organization
* Transaction endorsement node
* Policy endorsement organization
* Policy endorsement node
* Policy endorsement identities (individual admins)
* Storage nodes (committing peers)
* Ordering node
* Query, relay, and retrieval node

### Who do I talk to? ###

* This Repo was first created by Emeka Chukwu (EmekaC@nameksolutions.com) as part of his PhD thesis.
* Contact others

### License ###
Apache License Version 2.0
RegistryChain source code files are available for blockchain network creators to freely use to bootstrap their network. We only ask that you notify and give credit where possible once the network is up and running.