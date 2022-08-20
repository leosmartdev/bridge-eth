// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./Token.sol";

contract BridgeBase is Initializable {
    using SafeMathUpgradeable for uint256;
    address public admin;
    address public feeWallet;
    Token public token;
    mapping(address => uint256) public nonce;
    mapping(address => mapping(uint256 => bool)) public processedNonces;
    uint8 public fee;

    function setFee(uint8 _fee, address _feeWallet) public {
        require(msg.sender == admin, "only admin");
        require(_fee >= 0 && _fee < 1000, "0<=,<1000");
        require(_feeWallet != address(0), "_feeWallet can not be 0 address");
        fee = _fee;
        feeWallet = _feeWallet;
    }

    event Convert(
        address from,
        uint8 network,
        address to,
        uint256 amount,
        uint256 date,
        uint256 nonce
    );

    function initialize(address _admin, address _token) public initializer {
        require(_admin != address(0), "_admin can not be 0 address");
        require(_token != address(0), "_token can not be 0 address");

        admin = _admin;
        token = Token(payable(_token));
    }

    function deposit(
        uint8 network,
        address _to,
        uint256 _amount
    ) public {
        nonce[msg.sender]++;
        token.transferFrom(
            msg.sender,
            address(this),
            _amount.mul(2000 - fee).div(2000)
        );
        if (fee > 0)
            token.transferFrom(
                msg.sender,
                feeWallet,
                _amount.mul(fee).div(2000)
            );

        emit Convert(
            msg.sender,
            network,
            _to,
            _amount,
            block.timestamp,
            nonce[msg.sender]
        );
    }

    function withdraw(
        address _to,
        uint256 _amount,
        uint256 _nonce
    ) public {
        require(msg.sender == admin, "only admin");
        require(_to != address(0), "_to can not be 0 address");

        require(!processedNonces[msg.sender][_nonce], "already withdrawn");
        processedNonces[msg.sender][_nonce] = true;
        token.transfer(_to, _amount.mul(1000 - fee).div(1000));
        if (fee > 0) token.transfer(feeWallet, _amount.mul(fee).div(2000));
    }

    function getBalance(address aa) public view returns (uint256) {
        return token.balanceOf(aa);
    }

    function getServerBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
