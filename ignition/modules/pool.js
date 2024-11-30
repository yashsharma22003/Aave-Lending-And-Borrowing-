const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("pool", (m) => {
    const pool = m.contract("pool", ["0xB3Bf4C1628F7Ba2F93eeEdbA50Cbcd2e7B2A866D"]);
    return { pool };
});