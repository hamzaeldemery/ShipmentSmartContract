import { BN, expectEvent } from "@openzeppelin/test-helpers";
import Web3 from "web3";
import ShipmentContract from "./Contracts/Shipment.json";

const getWeb3 = async () =>
    new Promise((resolve, reject) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener("load", async () => {
            // Fallback to localhost; use dev console port by default...
            const provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:8545"
            );
            const web3 = new Web3(provider);
            console.log("No web3 instance injected, using Local web3.");
            resolve(web3);
        });
    }).catch((e) => {
        console.log("err on creating: " + e);
    });

export const getCookie = (name) => {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Return null if not found
    return "";
};

export const setUser = async (address, role) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        // contract._address = address;
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress")
        );
        console.log(contract.options);
        let data = contract.methods
            ?.setUser(role)
            .send({ from: address, gas: 140000, gasPrice: 20000000000 })
            .then((res) => {
                return true;
            })
            .catch((err) => {
                return false;
            });

        return data;
    } catch (e) {
        console.log("err in set user -->", e);
    }
};

export const verifyUser = async (address, userAddress) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        // contract._address = address;
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        const user = await contract.methods
            ?.verifyUser(userAddress)
            .send({ from: address, gas: 140000, gasPrice: 20000000000 })
            .then((receipt) => {
                console.log("receipt in verify user ----->", receipt);
            });

        console.log("user in verify user ----->", user);
    } catch (e) {
        console.log("verify user err -->", e);
    }
};

export const createShipment = async (address, seller, buyer, price) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        const shipment = await contract.methods
            ?.createShipment(price, seller, buyer)
            // .estimateGas({ from: address })
            .send({ from: address, gas: 200000, gasPrice: 20000000000 })
            .then((receipt) => {
                return receipt;
            });

        console.log("shipment in create shipment ----->", shipment);
        return shipment;
    } catch (e) {
        console.log("create shipment err -->", e);
    }
};

export const transferOwnership = async (
    address,
    shipment_id,
    new_owner,
    ownerType
) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        const shipment = await contract.methods
            ?.transferOwnership(shipment_id, new_owner, ownerType)
            // .estimateGas({ from: address })
            .send({ from: address, gas: 100000, gasPrice: 20000000000 })
            .then((receipt) => {
                console.log("receipt in create shipment ----->", receipt);
            });

        console.log("shipment in create shipment ----->", shipment);
        return shipment;
    } catch (e) {
        console.log("create shipment err -->", e);
    }
};

export const getShipment = async (address, shipmentId) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        console.log(contract);
        const shipment = await contract.methods
            ?.showShipment(shipmentId)
            // .estimateGas({ from: address })
            .call()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return false;
            });

        console.log("shipment in create shipment ----->", shipment);
        return shipment;
    } catch (e) {
        console.log("create shipment err -->", e);
    }
};
//todo
export const confirmShipment = async (address, shipmentId) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        console.log(contract);
        const shipment = await contract.methods
            ?.confirmShipment(shipmentId)
            // .estimateGas({ from: address })
            .send({ from: address, gas: 60000, gasPrice: 20000000000 })
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });

        console.log("shipment in create shipment ----->", shipment);
        return shipment;
    } catch (e) {
        console.log("create shipment err -->", e);
    }
};
//todo
export const startShipment = async (address, shipmentId) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        console.log(contract);
        const shipment = await contract.methods
            ?.startShipping(shipmentId)
            // .estimateGas({ from: address })
            .send({ from: address, gas: 60000, gasPrice: 20000000000 })
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });

        console.log("shipment in create shipment ----->", shipment);
        return shipment;
    } catch (e) {
        console.log("create shipment err -->", e);
    }
};

export const exitApproval = async (address, shipmentId) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        console.log(contract);
        const shipment = await contract.methods
            ?.customExitApproval(shipmentId)
            // .estimateGas({ from: address })
            .send({ from: address, gas: 60000, gasPrice: 20000000000 })
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });

        console.log("shipment in customExitApproval ----->", shipment);
        return shipment;
    } catch (e) {
        console.log("customExitApproval err -->", e);
    }
};

export const entryApproval = async (address, shipmentId) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        console.log(contract);
        const shipment = await contract.methods
            ?.customEntryApproval(shipmentId)
            // .estimateGas({ from: address })
            .send({ from: address, gas: 60000, gasPrice: 20000000000 })
            .then((res) => {
                console.log("ressed?: ", res);
                return res;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });

        console.log("shipment in customEntryApproval ----->", shipment);
        return shipment;
    } catch (e) {
        console.log("customEntryApproval err -->", e);
    }
};

export const payShipment = async (address, shipmentId) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        console.log(contract);
        const shipment = await contract.methods
            ?.showShipment(shipmentId)
            .call();
        const payment = await contract.methods
            ?.payShipment(shipmentId)
            // .estimateGas({ from: address })
            .send({
                from: address,
                value: shipment?.price,
                gas: 60000,
                gasPrice: 20000000000,
            })
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });

        console.log("shipment in customEntryApproval ----->", payment);
        return payment;
    } catch (e) {
        console.log("customEntryApproval err -->", e);
    }
};

export const confirmDelivery = async (address, shipmentId) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);

    try {
        const contract = new web3.eth.Contract(
            ShipmentContract.abi,
            localStorage.getItem("contractAddress"),
            { from: address }
        );
        console.log(contract);
        const payment = await contract.methods
            ?.buyerConfirmationOfDelivery(shipmentId)
            // .estimateGas({ from: address })
            .send({
                from: address,
                gas: 60000,
                gasPrice: 20000000000,
            })
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });

        console.log("shipment in buyer delivery ----->", payment);
        return payment;
    } catch (e) {
        console.log("buyer delivery err -->", e);
    }
};
export default getWeb3;
