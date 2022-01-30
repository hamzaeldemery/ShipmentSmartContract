import React from "react";
import { Admin } from "../Admin";
import { Customs } from "../Customs";
import { Logistics } from "../Logistics";
import { Buyer } from "../Buyer";

export const Home = () => {
    const getPage = () => {
        const role = localStorage.getItem("userRole");
        if (role === "ADMIN") return <Admin />;
        if (role === "LOGISTICS") return <Logistics />;
        if (role === "CUSTOM") return <Customs />;
        if (role === "BUYER") return <Buyer />;
        else return <div>Home</div>;
    };
    return (
        <div>
            <h1 className=" text-center fw-bold display-4 my-4">
                User Actions
            </h1>
            {getPage()}
        </div>
    );
};

export default Home;
