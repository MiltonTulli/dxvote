#!/usr/bin/env bash

export PRIVATE_KEY=0x0054b824c2083e7db09f36edb2ab24eb31f8276fa6cd62e30b42e3a185b37179
export PASSWORD="TestMetaMask"
export NETWORK_NAME=localhost
export RPC_URL=http://127.0.0.1:8545/
export CHAIN_ID=1337
export IS_TESTNET=true

# Optional synpress environment variables: 
# SECRET_WORDS="dxdao dxdao dxdao dxdao dxdao dxdao dxdao dxdao dxdao dxdao dxdao dxdao"
# export METAMASK_VERSION="latest"
# export NETWORK_NAME="localhost"

# TODO: Read vars from env

synpress run --configFile synpress.json -record --key 8616f615-50f6-4da2-afc5-822d4233e695