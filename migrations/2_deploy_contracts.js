const MyContract = artifacts.require("ShipmentContract");

module.exports = function (deployer) {
    deployer.deploy(MyContract);
};
