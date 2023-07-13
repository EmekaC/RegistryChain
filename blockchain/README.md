# Hyperledger fabric(test_cura)
A basic hyperledger network


## Steps in creating the network
*   ### **create artifacts folder**
    *   create a crypto-config.yaml file for bootstrapping the organizations identities
    *   create a shell script(create-artifacts.sh) which outputs the result in in a folder called   crypto-config
    *   create a configtx.yaml file for the channel artifacts to perform the following
        *  genesis block - contains organizations certificates
        *  channel configuration info
        *  configures anchor peer for each organization
*   ### **Add script to create channel configurations**
    *   create channel.
    *   Join organizations to the channel.
    *   updata anchor peers.
*   ### **Add a deploy script to bring up our network**
    *   set global enviromental variables
    *   create funcitons to set enviromental variables for each peer for an organization
    *   add presetup function - to install dependencies for our smart contract
    *   package chaincode - outputs our chaincode in chaincodeName.tar.gz format
    *   install packaged chaincode on our endorsing peers
    *   approve chaincode for organization. ***we first query the chaincode to get the package id***.
    *   checkCommitRedyness to show if the organizations are all in favour of the chaincode
    *   commit chaincode definition to the peers.
    *   invoke chaincode init method