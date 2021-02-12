var covid19 = artifacts.require("./covid19.sol");
var web3 = require('web3-utils');
var ld = require('lodash');
var bsv = require('bsv');

contract("covid19", function(accounts) {
  	var ipfs;

//**********************************************************************************************
// insertRecord()from training data
//**********************************************************************************************
const iused = 0
var igas = 0
it("it inserts observation from Training_Data_1", function() {
  return covid19.deployed().then(function(instance) {
    var fs = require("fs");
    var text = fs.readFileSync("/Users/SaiBatchu/Desktop/Solidity_COVID/training_data.txt").toString('utf-8');
    var textByLine = text.split("\n");
    var arrayLength = textByLine.length;
    console.log("CONTRACT CONTAINS".concat(" ", arrayLength.toString(10), " ", "ENTRIES"));
    for (var i = 0; i < arrayLength; i++) {
        var fields = textByLine[i].split("\t");
        console.log("inserted:".concat( "[ ", fields[0], " ", fields[1], " ", fields[2], " ", fields[3], " ", fields[4],  " ]"));
        instance.insertRecord(fields[0], fields[1], fields[2], fields[3], fields[4]);
        const igas = instance.insertRecord.estimateGas(fields[0], fields[1], fields[2], fields[3], fields[4]);
        console.log(Number(igas));
    }
    return instance;
  }).then(function() {

        const iused = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`insert uses approximately ${Math.round(iused * 100) / 100} MB`);

      });
});
const qgas = 0
it("testing retrieval function ", function() {
  return covid19.deployed().then(function(instance) {
  ipfs = instance;
  return ipfs.retrieveRecord.call("B.1.1.7", "599", "*");
  }).then(function(structArray) {
        console.log(structArray);
        console.log("struct for patient");
        const qused = (process.memoryUsage().heapUsed / 1024 / 1024) - iused;
        console.log(`query used ${Math.round(qused * 100) / 100} MB`);
    });
});

});
