#Generate crypto artifacts for organizations
cryptogen generate --config=./crypto-config.yaml --output=./crypto-config/

#System channel
SYS_CHANNEL="sys-channel"

# channel name
CHANNEL_NAME="mychannel"

echo $CHANNEL_NAME

# Generate system genesis block
configtxgen -profile OrdererGenesis -configPath . -channelID $SYS_CHANNEL -outputBlock ./genesis.block



# Generate channel configuration block
configtxgen -profile BasicChannel -configPath . -channelID $CHANNEL_NAME -outputCreateChannelTx ./mychannel.tx

# Generate anchor peer update of peer organizations
echo "##########      Generating anchor peers update for Org1MSP   ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ./Org1MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org1MSP

echo "##########      Generating anchor peers update for Org2MSP   ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ./Org2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org2MSP

echo "##########      Generating anchor peers update for Org3MSP   ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ./Org3MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org3MSP
