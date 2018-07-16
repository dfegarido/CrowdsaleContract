#!/bin/bash

echo "removing previous compiled JSON..."
rm -rf build/contracts/*

echo "Compling..."
truffle compile

echo "Now, migrating the contracts to test development!!!"
truffle migrate

echo "Running the test mode!!!"
truffle test