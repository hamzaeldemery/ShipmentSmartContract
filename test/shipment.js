const { BN, expectEvent } = require("@openzeppelin/test-helpers");
const Web3 = require("web3");
const Shipment = artifacts.require("ShipmentContract");

contract("ShipmentContract", (accounts) => {
    before(async () => {
        this.owner = accounts[0];
        //============ ENUMS
        this.statusEnums = {
            PENDING: { val: "PENDING", pos: 0 },
            SHIPPING: { val: "SHIPPING", pos: 1 },
            SHIPPED: { val: "SHIPPED", pos: 2 },
            DELIVERED: { val: "DELIVERED", pos: 3 },
        };
        this.ownerEnums = {
            SELLER: { val: "SELLER", pos: 0 },
            CARRIER: { val: "CARRIER", pos: 1 },
            BUYER: { val: "BUYER", pos: 2 },
        };
        this.roleEnums = {
            CUSTOM: { val: "CUSTOM", pos: 0 },
            LOGISTICS: { val: "LOGISTICS", pos: 1 },
            SELLER: { val: "SELLER", pos: 2 },
            CARRIER: { val: "CARRIER", pos: 3 },
            BUYER: { val: "BUYER", pos: 4 },
        };

        this.defaultUsers = {
            seller: {
                address: accounts[1],
                role: this.roleEnums.SELLER,
            },
            buyer: {
                address: accounts[2],
                role: this.roleEnums.BUYER,
            },
            carrier: {
                address: accounts[3],
                role: this.roleEnums.CARRIER,
            },
            customs: {
                address: accounts[4],
                role: this.roleEnums.CUSTOM,
            },
            logistics: {
                address: accounts[5],
                role: this.roleEnums.LOGISTICS,
            },
        };
        this.shipmentInstance = await Shipment.deployed();
        this.providerURL = "https://localhost:8545";
        this.web3 = new Web3(this.providerURL);
    });

    it("should create users successfully", async () => {
        for (let user in this.defaultUsers) {
            const { address, role } = this.defaultUsers[user];
            const createdUser = await this.shipmentInstance.setUser(role.val, {
                from: address,
            });

            expectEvent(createdUser.receipt, "CreateUser", {
                userID: address,
            });

            const userResult = await this.shipmentInstance.users.call(address);

            assert.equal(address, userResult.id, "Mismatch of IDs");
            assert.equal(
                role.pos,
                userResult.role.toString(),
                "Mismatch of roles"
            );
        }
    });

    it("should verify users successfully", async () => {
        for (let user in this.defaultUsers) {
            const { address } = this.defaultUsers[user];
            const verifiedUser = await this.shipmentInstance.verifyUser(
                address,
                {
                    from: this.owner,
                }
            );
            expectEvent(verifiedUser.receipt, "VerifyUser", {
                userID: address,
            });
        }
    });

    it("should create shipment succeffully", async () => {
        const shipment = await this.shipmentInstance.createShipment(
            this.web3.utils.toWei("0.000000000000000001"),
            this.defaultUsers.seller.address,
            this.defaultUsers.buyer.address,
            {
                from: this.defaultUsers.logistics.address,
            }
        );
        expectEvent(shipment.receipt, "CreateShipment", {
            id: new BN(100),
            price: new BN(1),
            seller: this.defaultUsers.seller.address,
            buyer: this.defaultUsers.buyer.address,
        });
        const shipmentResult = await this.shipmentInstance.shipments.call(100);

        assert.equal(1, shipmentResult.price, "Mismatch of price");
        assert.equal(
            this.defaultUsers.seller.address,
            shipmentResult.seller,
            "Mismatch of seller"
        );
        assert.equal(
            this.defaultUsers.buyer.address,
            shipmentResult.buyer,
            "Mismatch of buyer"
        );
    });

    it("should proceed with payment", async () => {
        const payment = await this.shipmentInstance.payShipment(100, {
            from: this.defaultUsers.buyer.address,
            value: 1,
        });
        expectEvent(payment.receipt, "ShipmentPaid", {
            id: new BN(100),
            price: new BN(1),
        });
        const shipmentResult = await this.shipmentInstance.shipments.call(100);

        assert.equal(1, shipmentResult.price, "Mismatch of price");
        assert.equal(
            this.defaultUsers.seller.address,
            shipmentResult.seller,
            "Mismatch of seller"
        );
        assert.equal(
            this.defaultUsers.buyer.address,
            shipmentResult.buyer,
            "Mismatch of buyer"
        );
    });

    it("should approve custom's exit", async () => {
        const shipment = await this.shipmentInstance.customExitApproval(100, {
            from: this.defaultUsers.customs.address,
        });
        expectEvent(shipment.receipt, "CustomExitApproval", {
            id: new BN(100),
            customApproved: true,
        });
        const shipmentResult = await this.shipmentInstance.shipments.call(100);

        assert.equal(1, shipmentResult.price, "Mismatch of price");
        assert.equal(
            this.defaultUsers.seller.address,
            shipmentResult.seller,
            "Mismatch of seller"
        );
        assert.equal(
            this.defaultUsers.buyer.address,
            shipmentResult.buyer,
            "Mismatch of buyer"
        );
    });

    it("should transfer ownership", async () => {
        const shipment = await this.shipmentInstance.transferOwnership(
            100,
            this.defaultUsers.carrier.address,
            this.ownerEnums.CARRIER.val,
            {
                from: this.defaultUsers.logistics.address,
            }
        );
        expectEvent(shipment.receipt, "TransferOwnership", {
            id: new BN(100),
            price: new BN(1),
            seller: this.defaultUsers.seller.address,
            buyer: this.defaultUsers.buyer.address,
            ownerId: this.defaultUsers.carrier.address,
        });
        const shipmentResult = await this.shipmentInstance.shipments.call(100);

        assert.equal(1, shipmentResult.price, "Mismatch of price");
        assert.equal(
            this.defaultUsers.seller.address,
            shipmentResult.seller,
            "Mismatch of seller"
        );
        assert.equal(
            this.defaultUsers.buyer.address,
            shipmentResult.buyer,
            "Mismatch of buyer"
        );
        assert.equal(
            this.defaultUsers.carrier.address,
            shipmentResult.ownerId,
            "Mismatch of buyer"
        );
        assert.equal(
            this.ownerEnums.CARRIER.pos,
            shipmentResult.owner,
            "Mismatch of buyer"
        );
    });
    it("should start shipping", async () => {
        const shipment = await this.shipmentInstance.startShipping(100, {
            from: this.defaultUsers.logistics.address,
        });
        expectEvent(shipment.receipt, "StartShipping", {
            id: new BN(100),
            ownerId: this.defaultUsers.carrier.address,
            status: new BN(this.statusEnums.SHIPPING.pos),
        });
        const shipmentResult = await this.shipmentInstance.shipments.call(100);

        assert.equal(1, shipmentResult.price, "Mismatch of price");
        assert.equal(
            this.statusEnums.SHIPPING.pos,
            shipmentResult.status,
            "Mismatch of status"
        );
    });

    it("should get shipment status", async () => {
        const shipment = await this.shipmentInstance.getShipmentStatus(100, {
            from: this.defaultUsers.logistics.address,
        });

        const shipmentResult = await this.shipmentInstance.shipments.call(100);

        assert.equal(1, shipmentResult.price, "Mismatch of price");
        assert.equal(
            this.statusEnums.SHIPPING.pos,
            shipmentResult.status,
            "Mismatch of status"
        );
    });

    it("should confirm shipment", async () => {
        const shipment = await this.shipmentInstance.confirmShipment(100, {
            from: this.defaultUsers.logistics.address,
        });

        const shipmentResult = await this.shipmentInstance.shipments.call(100);

        assert.equal(1, shipmentResult.price, "Mismatch of price");
        assert.equal(
            this.statusEnums.SHIPPED.pos,
            shipmentResult.status,
            "Mismatch of status"
        );
    });

    it("should approve custom entry", async () => {
        const shipment = await this.shipmentInstance.customEntryApproval(100, {
            from: this.defaultUsers.customs.address,
        });

        const shipmentResult = await this.shipmentInstance.shipments.call(100);

        assert.equal(1, shipmentResult.price, "Mismatch of price");
        assert.equal(
            this.statusEnums.SHIPPED.pos,
            shipmentResult.status,
            "Mismatch of status"
        );
    });

    it("should confirm delivery to buyer", async () => {
        const shipment =
            await this.shipmentInstance.buyerConfirmationOfDelivery(100, {
                from: this.defaultUsers.buyer.address,
            });

        const shipmentResult = await this.shipmentInstance.shipments.call(100);

        assert.equal(1, shipmentResult.price, "Mismatch of price");
        assert.equal(
            this.statusEnums.DELIVERED.pos,
            shipmentResult.status,
            "Mismatch of status"
        );
    });
});
