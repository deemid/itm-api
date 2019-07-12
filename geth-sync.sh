#!/usr/bin/env bash
echo "Geth at work!"
#screen -dmS geth geth --testnet --syncmode "fast" --rpc --rpcapi db,eth,net,web3,personal,admin,debug --cache=1024  --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*"
screen -dmS geth geth --testnet --rpc --rpcapi db,eth,net,web3,personal,admin,debug --cache=1024  --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*"