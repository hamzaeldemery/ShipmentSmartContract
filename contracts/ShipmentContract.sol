// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract ShipmentContract{
    
    //============ ENUMS
    enum STATUS{ PENDING,SHIPPING, SHIPPED, DELIVERED }
    enum OWNER{ SELLER, CARRIER, BUYER }
    enum ROLE{ CUSTOM, LOGISTICS, SELLER, CARRIER, BUYER}

    //============ STRUCTS
    struct Shipment {
        uint id;
        STATUS status;
        OWNER owner;
        address ownerId;
        uint price;
        address payable seller;
        address buyer;
        bool paid;
        bool customExit;
        bool customEnter;
    }

    struct User{
        address id;
        ROLE role;
        bool isVerified;
    }

    //============ VARIABLES
    address private admin;
    uint[] private shipmentIds;
    address[] public userIds;
    mapping(uint => Shipment) public shipments;
    mapping(address => User) public users;

    //============ CONSTRUCTOR
    constructor(){
        admin = msg.sender;
    }

    //============ EVENTS
    event CreateUser(address userID);
    event VerifyUser(address userID);
    event CreateShipment(uint id, uint price, address seller, address buyer);
    event TransferOwnership(uint id, uint price, address seller, address buyer, address ownerId);
    event CustomExitApproval(uint id, bool customApproved);
    event ShipmentPaid(uint id, uint price);
    event StartShipping(uint id, address ownerId, STATUS status);

    //============ MODIFIERS
    modifier onlyAdmin(){
        require(tx.origin == admin,"Only admins allowed to do such a function");
        _;
    }
    modifier non_users(){
        require(users[tx.origin].isVerified != true, "User already exists");
        _;
    }
    modifier onlyUsers(){
        require(users[tx.origin].isVerified == true , "User doesnt exists");
        _;
    }
    modifier noneAdmin(){
        require(tx.origin != admin,"Admins are not allowed to do such a function");
        _;
    }
    modifier onlyPaid(uint _shipment_id){
        require(shipments[_shipment_id].paid == true,"Shipment not paid");
        _;
    }
    modifier notPaid(uint _shipment_id){
        require(shipments[_shipment_id].paid != true,"Shipment already paid");
        _;
    }
    modifier onlyLogistics(){
        require(users[tx.origin].role == ROLE.LOGISTICS,"Only logistics allowed to do such a function");
        _;
    }
    modifier onlyCustom(){
        require(users[tx.origin].role == ROLE.CUSTOM,"Only Customs allowed to do such a function");
        _;
    }
    modifier onlyBuyer(){
        require(users[tx.origin].role == ROLE.BUYER,"Only Buyer allowed to do such a function");
        _;
    }
    modifier VerifyShipmentId(uint _id){
        require(shipmentIds.length >= _id + 1, "No such ID");
        _;
    }
    modifier customApprovedExit(uint _shipmentId){
        require(shipments[_shipmentId].customExit == true, "Customs should approve shipment exit");
        _;
    }
    modifier customApprovedEntry(uint _shipmentId){
        require(shipments[_shipmentId].customEnter == true, "Customs should approve shipment entry");
        _;
    }
    modifier shipmentStatusPending(uint _shipmentId){
        require(shipments[_shipmentId].status == STATUS.PENDING, "Shipment status has to be pending to do such an action");
        _;
    }
    modifier shipmentStatusShipping(uint _shipmentId){
        require(shipments[_shipmentId].status == STATUS.SHIPPING, "Shipment status has to be shipping to do such an action");
        _;
    }
    modifier shipmentStatusShipped(uint _shipmentId){
        require(shipments[_shipmentId].status == STATUS.SHIPPED, "Shipment status has to be shipped to do such an action");
        _;
    }

    //============ FUNCTIONS
    function setUser(string memory role) external noneAdmin non_users returns(User memory userC){
        userIds.push(msg.sender);
        ROLE userType = parsingToUser(role);
        User memory user = User(
            msg.sender,
            userType,
            false
        );
        users[msg.sender] = user;
        emit CreateUser(msg.sender);
        return user;
    }

    function getNonVerifiedUsers() external view onlyAdmin returns(address[] memory _users){
        return userIds;
    }

    function verifyUser(address userId) external onlyAdmin{
        users[userId].isVerified = true;
        emit VerifyUser(userId);
    }

    function createShipment(
        uint _price, 
        address payable _seller, 
        address _buyer
        ) 
        external 
        onlyLogistics
    {
        require(users[_seller].isVerified && users[_buyer].isVerified,"Shipment users not found or not yet verified");
        uint _id = shipmentIds.length;
        shipmentIds.push(_id);
        Shipment memory shipment = 
            Shipment(
                    _id, 
                    STATUS.PENDING,
                    OWNER.SELLER,
                    _seller,
                    _price,
                    _seller,
                    _buyer,
                    false,
                    false,
                    false
            );
        shipments[_id] = shipment;
        emit CreateShipment(_id,_price,_seller, _buyer);
    }
    
    function showShipment(uint id) 
    external view 
    VerifyShipmentId(id)
    returns(Shipment memory _shipment )
    {
        return (shipments[id]);
    }

    function getPrice(uint id) external view returns(uint price){
        return shipments[id].price;
    }

    function payShipment(uint _shipment_id) external payable onlyBuyer notPaid(_shipment_id){    
        
        require(msg.value == shipments[_shipment_id].price, "smaller");
        // require(msg.value < shipments[_shipment_id].price, "bigger");
        shipments[_shipment_id].seller.transfer(shipments[_shipment_id].price);
        shipments[_shipment_id].paid = true;
        emit ShipmentPaid(_shipment_id, shipments[_shipment_id].price);
    }

    function transferOwnership(uint _id, address newOwner, string memory owner) external onlyLogistics {
        require(users[newOwner].isVerified, "New user not registered or not yet verified");
        OWNER _owner = parsingToOwner(owner);
        Shipment memory shipment = shipments[_id];
        shipment.owner = _owner;
        shipment.ownerId = newOwner;
        shipments[_id] = shipment;
        emit TransferOwnership(_id,shipment.price,shipment.seller, shipment.buyer, shipment.ownerId);
    }

    function customExitApproval(uint shipmentId) external onlyCustom onlyPaid(shipmentId){
        shipments[shipmentId].customExit = true;
        emit CustomExitApproval(shipmentId, shipments[shipmentId].customExit);
    }

    function customEntryApproval(uint shipmentId) external onlyCustom{
        shipments[shipmentId].customEnter = true;
    }

    function startShipping(uint _shipment_id)
             external
             onlyLogistics
             customApprovedExit(_shipment_id)
             shipmentStatusPending(_shipment_id)
    {
        Shipment storage shipment = shipments[_shipment_id]; 
        shipment.status = STATUS.SHIPPING;
        emit StartShipping( _shipment_id, shipment.ownerId, shipment.status);
    }    

    function getShipmentStatus(uint _shipment_id) external view VerifyShipmentId(_shipment_id) returns(STATUS _status){
        return (shipments[_shipment_id].status);
    }

    function confirmShipment(uint _shipment_id) external onlyLogistics shipmentStatusShipping(_shipment_id){
        shipments[_shipment_id].status = STATUS.SHIPPED;
    }

    function buyerConfirmationOfDelivery(uint _shipmentId)external onlyBuyer shipmentStatusShipped(_shipmentId){
        shipments[_shipmentId].status = STATUS.DELIVERED;
    }

    //============ PARSING
    function parsingToOwner(string memory _owner) private pure returns(OWNER _ownerValue){
        bytes32 encodedOwner = keccak256(abi.encodePacked(_owner));
        bytes32 encodedSeller = keccak256(abi.encodePacked("SELLER"));
        bytes32 encodedCarrier = keccak256(abi.encodePacked("CARRIER"));
        bytes32 encodedBuyer = keccak256(abi.encodePacked("BUYER"));
        if(encodedOwner == encodedSeller){
            return OWNER.SELLER;
        }
        if(encodedOwner == encodedCarrier){
            return OWNER.CARRIER;
        }
        if(encodedOwner == encodedBuyer){
            return OWNER.BUYER;
        }

        revert("Recieved a wrong type of owner");
    }

    function parsingToUser(string memory _user) private pure returns(ROLE _userValue){
        bytes32 encodedUser = keccak256(abi.encodePacked(_user));
        bytes32 encodedSeller = keccak256(abi.encodePacked("SELLER"));
        bytes32 encodedCarrier = keccak256(abi.encodePacked("CARRIER"));
        bytes32 encodedBuyer = keccak256(abi.encodePacked("BUYER"));
        bytes32 encodedCustom = keccak256(abi.encodePacked("CUSTOM"));
        bytes32 encodedLogistics = keccak256(abi.encodePacked("LOGISTICS"));
        if(encodedUser == encodedSeller){
            return ROLE.SELLER;
        }
        if(encodedUser == encodedCarrier){
            return ROLE.CARRIER;
        }
        if(encodedUser == encodedBuyer){
            return ROLE.BUYER;
        }
        if(encodedUser == encodedCustom){
            return ROLE.CUSTOM;
        }
        if(encodedUser == encodedLogistics){
            return ROLE.LOGISTICS;
        }
        revert("Recieved a wrong type of user");
    }
    function parsingToStatus(string memory _status) private pure returns(STATUS _statusValue){
        bytes32 encodedUser = keccak256(abi.encodePacked(_status));
        bytes32 encodedPending = keccak256(abi.encodePacked("PENDING"));
        bytes32 encodedShipped = keccak256(abi.encodePacked("SHIPPED"));
        bytes32 encodedDelivered = keccak256(abi.encodePacked("DELIVERED"));
        if(encodedUser == encodedPending){
            return STATUS.PENDING;
        }
        if(encodedUser == encodedShipped){
            return STATUS.SHIPPED;
        }
        if(encodedUser == encodedDelivered){
            return STATUS.DELIVERED;
        }
        revert("Recieved a wrong type of status");
    }
}