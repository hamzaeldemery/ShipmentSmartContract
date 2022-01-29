import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
// import TruffleContract from "truffle-contract";
import ShipmentContract from "./Contracts/Shipment.json";
import getWeb3, { getCookie } from "./helpers";

import { NavBar, Signup, Signin, Home } from "./Components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
    const [auth, setAuth] = useState(getCookie("username").length > 0);
    const [accounts, setAccounts] = useState([]);
    const [instance, setInstance] = useState();
    useEffect(() => {
        const getWeb3Props = async () => {
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const acc = await web3.eth.getAccounts();
            setAccounts(acc);
            if (!localStorage.getItem("contractAddress")?.length) {
                const inst = new web3.eth.Contract(ShipmentContract.abi);
                const tx = inst.deploy({ data: ShipmentContract.bytecode });
                console.log("inst --->", tx);
                const createTransaction =
                    await web3.eth.accounts.signTransaction(
                        {
                            from: acc[1],
                            data: tx.encodeABI(),
                            gas: "6721973",
                        },
                        process?.env?.PRIVATE_KEY ||
                            "0x21a5dbcc8e90087c392f2a4362c04d6eb40f1676d8ffb2da18d8cd60c678af3c"
                    );
                const createReceipt = await web3.eth.sendSignedTransaction(
                    createTransaction.rawTransaction
                );
                console.log(
                    "Contract deployed at address",
                    createReceipt.contractAddress
                );
                localStorage.setItem(
                    "contractAddress",
                    createReceipt.contractAddress
                );
                setInstance(inst);
            }
        };
        getWeb3Props();
    }, []);

    // useEffect(() => {
    //     console.log("instance ---->", instance);
    // }, [instance]);

    return (
        <div className="">
            <Router>
                <NavBar auth={auth} setAuth={setAuth} />
                <Routes>
                    {!auth ? (
                        <>
                            <Route
                                path="/signup"
                                element={<Signup accounts={accounts} />}
                            />
                            <Route
                                path="/login"
                                element={<Signin setAuth={setAuth} />}
                            />
                        </>
                    ) : (
                        <>
                            <Route path="/dashboard" element={<Home />} />
                        </>
                    )}
                    <Route
                        path="*"
                        element={
                            <Navigate to={auth ? "/dashboard" : "/login"} />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
