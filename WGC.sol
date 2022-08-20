// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

interface IStake {
    function depositReward(uint256 amount) external returns (uint256);
}

interface IPancakeRouter01 {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        );

    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETH(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountToken, uint256 amountETH);

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETHWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountToken, uint256 amountETH);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountOut);

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountIn);

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);

    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);
}

interface IPancakeRouter02 is IPancakeRouter01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountETH);

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}

interface IPancakePair {
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external pure returns (string memory);

    function symbol() external pure returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(
        address indexed sender,
        uint256 amount0,
        uint256 amount1,
        address indexed to
    );
    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (
            uint112 reserve0,
            uint112 reserve1,
            uint32 blockTimestampLast
        );

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function kLast() external view returns (uint256);

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to)
        external
        returns (uint256 amount0, uint256 amount1);

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external;

    function skim(address to) external;

    function sync() external;

    function initialize(address, address) external;
}

interface IPancakeFactory {
    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint256
    );

    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);

    function allPairs(uint256) external view returns (address pair);

    function allPairsLength() external view returns (uint256);

    function createPair(address tokenA, address tokenB)
        external
        returns (address pair);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;

    function INIT_CODE_PAIR_HASH() external view returns (bytes32);
}

contract WGC is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    using SafeMathUpgradeable for uint256;
    IStake public stakingContract; // staking contract address
    address payable public plantingFundFeeAddress; // plant fund fee wallet
    address payable public liquidityAddress; // Liquidity Address
    uint256 constant maxFeeLimit = 300;
    uint8 _decimals;
    //anti sniper storages
    uint256 private _tradingActiveBlock;
    uint256 private _protectBlockCount;
    uint256 private _gasPriceLimit;
    uint256 private _protectBlockLiquidityFee;
    uint256 private _protectBlockStakingRewardFee;
    uint256 private _protectBlockPlantingFundFee;
    bool public tradingActive;

    mapping(address => bool) public isExcludedFromFee;

    uint256 private constant BUY = 1;
    uint256 private constant SELL = 2;
    uint256 private constant TRANSFER = 3;
    uint256 private constant PROTECT = 4;
    uint256 private buyOrSellSwitch;

    // these values are pretty much arbitrary since they get overwritten for every txn, but the placeholders make it easier to work with current contract.
    uint256 private _stakingRewardFee;
    uint256 private _previousStakingRewardFee;

    uint256 private _liquidityFee;
    uint256 private _previousLiquidityFee;

    uint256 private _plantingFundFee;
    uint256 private _previousPlantingFundFee;

    uint256 public buyStakingRewardFee;
    uint256 public buyLiquidityFee;
    uint256 public buyPlantingFundFee;

    uint256 public sellStakingRewardFee;
    uint256 public sellLiquidityFee;
    uint256 public sellPlantingFundFee;

    uint256 public transferStakingRewardFee;
    uint256 public transferLiquidityFee;
    uint256 public transferPlantingFundFee;

    mapping(address => bool) public isExcludedMaxTransactionAmount;

    // Anti-bot and anti-whale mappings and variables
    mapping(address => uint256) private _holderLastTransferTimestamp; // to hold last Transfers temporarily during launch
    bool private _transferDelayEnabled;

    uint256 private _liquidityTokensToSwap;
    uint256 private _plantingFundFeeTokensToSwap;
    uint256 private _stakingRewardFeeTokens;

    // store addresses that a automatic market maker pairs. Any transfer *to* these addresses
    // could be subject to a maximum transfer amount
    mapping(address => bool) public automatedMarketMakerPairs;

    uint256 public minimumFeeTokensToTake;
    uint256 public maxTransactionAmount;
    uint256 public maxWallet;

    IPancakeRouter02 public pancakeRouter;
    address public pancakePair;

    bool inSwapAndLiquify;

    event TradingActivated();
    event UpdateMaxTransactionAmount(uint256 maxTransactionAmount);
    event UpdateMaxWallet(uint256 maxWallet);
    event UpdateMinimumTokensBeforeFeeTaken(uint256 minimumFeeTokensToTake);
    event SetAutomatedMarketMakerPair(address pair, bool value);
    event ExcludedMaxTransactionAmount(
        address indexed account,
        bool isExcluded
    );
    event ExcludedFromFee(address account, bool isExcludedFromFee);
    event UpdateBuyFee(
        uint256 buyStakingRewardFee,
        uint256 buyLiquidityFee,
        uint256 buyPlantingFundFee
    );
    event UpdateSellFee(
        uint256 sellStakingRewardFee,
        uint256 sellLiquidityFee,
        uint256 sellPlantingFundFee
    );
    event UpdateTransferFee(
        uint256 transferStakingRewardFee,
        uint256 transferLiquidityFee,
        uint256 transferPlantingFundFee
    );
    event UpdateStakingAddress(address stakingAddress);
    event UpdatePlantingFundFeeAddress(address plantingFundFeeAddress);
    event UpdateLiquidityAddress(address _liquidityAddress);
    event SwapAndLiquify(uint256 tokensAutoLiq, uint256 ethAutoLiq);
    event StakingRewardTaken(uint256 stakingRewardFeeTokens);
    event PlantingFundFeeTaken(
        uint256 plantingFundFeeTokens,
        uint256 plantingFundFeeBNBSwapped
    );
    modifier lockTheSwap() {
        inSwapAndLiquify = true;
        _;
        inSwapAndLiquify = false;
    }

    function initialize(
        address _pancakeV2RouterAddress,
        address _stakingAddress,
        address _liquidityAddress,
        address _plantingFundFeeAddress,
        uint256[18] memory _uint_params,
        string memory _name,
        string memory _symbol,
        uint8 __decimals
    ) public initializer {
        __ERC20_init(_name, _symbol);
        __Ownable_init();
        _mint(msg.sender, _uint_params[17] * 10**__decimals);
        _decimals = __decimals;
        tradingActive = false;
        _transferDelayEnabled = false;
        liquidityAddress = payable(_liquidityAddress);
        plantingFundFeeAddress = payable(_plantingFundFeeAddress);
        stakingContract = IStake(_stakingAddress);
        _protectBlockCount = _uint_params[0];
        _gasPriceLimit = _uint_params[1];
        _protectBlockLiquidityFee = _uint_params[2];
        _protectBlockStakingRewardFee = _uint_params[3];
        _protectBlockPlantingFundFee = _uint_params[4];

        buyLiquidityFee = _uint_params[5];
        buyStakingRewardFee = _uint_params[6];
        buyPlantingFundFee = _uint_params[7];

        sellLiquidityFee = _uint_params[8];
        sellStakingRewardFee = _uint_params[9];
        sellPlantingFundFee = _uint_params[10];

        minimumFeeTokensToTake = _uint_params[11] * (10**decimals());
        maxTransactionAmount = _uint_params[12] * (10**decimals());
        maxWallet = _uint_params[13] * (10**decimals());

        transferLiquidityFee = _uint_params[14];
        transferStakingRewardFee = _uint_params[15];
        transferPlantingFundFee = _uint_params[16];

        pancakeRouter = IPancakeRouter02(_pancakeV2RouterAddress);

        pancakePair = IPancakeFactory(pancakeRouter.factory()).createPair(
            address(this),
            pancakeRouter.WETH()
        );

        isExcludedFromFee[_msgSender()] = true;
        isExcludedFromFee[address(this)] = true;
        isExcludedFromFee[_stakingAddress] = true;
        isExcludedFromFee[plantingFundFeeAddress] = true;
        excludeFromMaxTransaction(_msgSender(), true);
        excludeFromMaxTransaction(address(this), true);
        excludeFromMaxTransaction(_stakingAddress, true);
        excludeFromMaxTransaction(plantingFundFeeAddress, true);
        _setAutomatedMarketMakerPair(pancakePair, true);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function enableTrading() external onlyOwner {
        require(!tradingActive, "already enabled");
        tradingActive = true;
        _tradingActiveBlock = block.number;
        _transferDelayEnabled = true;
        emit TradingActivated();
    }

    function updateMaxTransactionAmount(uint256 _maxTransactionAmount)
        external
        onlyOwner
    {
        maxTransactionAmount = _maxTransactionAmount * (10**decimals());
        emit UpdateMaxTransactionAmount(_maxTransactionAmount);
    }

    function updateMaxWallet(uint256 _maxWallet) external onlyOwner {
        maxWallet = _maxWallet * (10**decimals());
        emit UpdateMaxWallet(_maxWallet);
    }

    function updateMinimumTokensBeforeFeeTaken(uint256 _minimumFeeTokensToTake)
        external
        onlyOwner
    {
        minimumFeeTokensToTake = _minimumFeeTokensToTake * (10**decimals());
        emit UpdateMinimumTokensBeforeFeeTaken(_minimumFeeTokensToTake);
    }

    function updateProtectBlockCount(uint256 protectBlockCount)
        external
        onlyOwner
    {
        _protectBlockCount = protectBlockCount;
    }

    function setAutomatedMarketMakerPair(address pair, bool value)
        public
        onlyOwner
    {
        require(
            pair != pancakePair,
            "The pair cannot be removed from automatedMarketMakerPairs"
        );

        _setAutomatedMarketMakerPair(pair, value);
    }

    function _setAutomatedMarketMakerPair(address pair, bool value) private {
        automatedMarketMakerPairs[pair] = value;

        excludeFromMaxTransaction(pair, value);

        emit SetAutomatedMarketMakerPair(pair, value);
    }

    function updateGasPriceLimit(uint256 gas) external onlyOwner {
        _gasPriceLimit = gas * 1 gwei;
    }

    // disable Transfer delay
    function disableTransferDelay() external onlyOwner {
        _transferDelayEnabled = false;
    }

    function excludeFromMaxTransaction(address updAds, bool isEx)
        public
        onlyOwner
    {
        isExcludedMaxTransactionAmount[updAds] = isEx;
        emit ExcludedMaxTransactionAmount(updAds, isEx);
    }

    function excludeFromFee(address account) external onlyOwner {
        isExcludedFromFee[account] = true;
        emit ExcludedFromFee(account, true);
    }

    function includeInFee(address account) external onlyOwner {
        isExcludedFromFee[account] = false;
        emit ExcludedFromFee(account, false);
    }

    function updateBuyFee(
        uint256 _buyStakingRewardFee,
        uint256 _buyLiquidityFee,
        uint256 _buyPlantingFundFee
    ) external onlyOwner {
        buyStakingRewardFee = _buyStakingRewardFee;
        buyLiquidityFee = _buyLiquidityFee;
        buyPlantingFundFee = _buyPlantingFundFee;
        require(
            _buyStakingRewardFee + _buyLiquidityFee + _buyPlantingFundFee <=
                maxFeeLimit,
            "Must keep Fee below 30%"
        );
        emit UpdateBuyFee(
            _buyStakingRewardFee,
            _buyLiquidityFee,
            _buyPlantingFundFee
        );
    }

    function updateSellFee(
        uint256 _sellStakingRewardFee,
        uint256 _sellLiquidityFee,
        uint256 _sellPlantingFundFee
    ) external onlyOwner {
        sellStakingRewardFee = _sellStakingRewardFee;
        sellLiquidityFee = _sellLiquidityFee;
        sellPlantingFundFee = _sellPlantingFundFee;
        require(
            _sellStakingRewardFee + _sellLiquidityFee + _sellPlantingFundFee <=
                maxFeeLimit,
            "Must keep Fees <= 30%"
        );
        emit UpdateSellFee(
            sellStakingRewardFee,
            sellLiquidityFee,
            sellPlantingFundFee
        );
    }

    function updateTransferFee(
        uint256 _transferStakingRewardFee,
        uint256 _transferLiquidityFee,
        uint256 _transferPlantingFundFee
    ) external onlyOwner {
        transferStakingRewardFee = _transferStakingRewardFee;
        transferLiquidityFee = _transferLiquidityFee;
        transferPlantingFundFee = _transferPlantingFundFee;
        require(
            _transferStakingRewardFee +
                _transferLiquidityFee +
                _transferPlantingFundFee <=
                maxFeeLimit,
            "Must keep Fees <= 30%"
        );
        emit UpdateTransferFee(
            _transferStakingRewardFee,
            _transferLiquidityFee,
            _transferPlantingFundFee
        );
    }

    function setProtectBlockFee(
        uint256 protectBlockStakingRewardFee,
        uint256 protectBlockLiquidityFee,
        uint256 protectBlockPlantingFundFee
    ) external onlyOwner {
        _protectBlockStakingRewardFee = protectBlockStakingRewardFee;
        _protectBlockLiquidityFee = protectBlockLiquidityFee;
        _protectBlockPlantingFundFee = protectBlockPlantingFundFee;
        require(
            _protectBlockStakingRewardFee +
                _protectBlockLiquidityFee +
                _protectBlockPlantingFundFee <
                1000,
            "Must keep Fees below 100%"
        );
    }

    function updateStakingAddress(address _stakingAddress) external onlyOwner {
        stakingContract = IStake(_stakingAddress);
        isExcludedFromFee[_stakingAddress] = true;
        excludeFromMaxTransaction(_stakingAddress, true);
        emit UpdateStakingAddress(_stakingAddress);
    }

    function updatePlantingFundFeeAddress(address _plantingFundFeeAddress)
        external
        onlyOwner
    {
        plantingFundFeeAddress = payable(_plantingFundFeeAddress);
        isExcludedFromFee[_plantingFundFeeAddress] = true;
        excludeFromMaxTransaction(_plantingFundFeeAddress, true);
        emit UpdatePlantingFundFeeAddress(_plantingFundFeeAddress);
    }

    function updateLiquidityAddress(address _liquidityAddress)
        external
        onlyOwner
    {
        liquidityAddress = payable(_liquidityAddress);
        emit UpdateLiquidityAddress(_liquidityAddress);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        if (!tradingActive) {
            require(
                isExcludedFromFee[from] || isExcludedFromFee[to],
                "Trading is not active yet."
            );
        }

        if (
            tradingActive &&
            _protectBlockCount > block.number.sub(_tradingActiveBlock) &&
            !inSwapAndLiquify
        ) {
            //anti sniper
            if (automatedMarketMakerPairs[from]) {
                require(
                    tx.gasprice <= _gasPriceLimit,
                    "Gas price exceeds limit."
                );
            }
        }
        if (!inSwapAndLiquify) {
            // at launch if the transfer delay is enabled, ensure the block timestamps for purchasers is set -- during launch.
            if (_transferDelayEnabled) {
                if (
                    to != address(pancakeRouter) && to != address(pancakePair)
                ) {
                    require(
                        _holderLastTransferTimestamp[tx.origin] < block.number,
                        "_transfer:: Transfer Delay enabled.  Only one purchase per block allowed."
                    );
                    _holderLastTransferTimestamp[tx.origin] = block.number;
                }
            }

            //when buy
            if (
                automatedMarketMakerPairs[from] &&
                !isExcludedMaxTransactionAmount[to]
            ) {
                require(
                    amount <= maxTransactionAmount,
                    "Buy transfer amount exceeds the maxTransactionAmount."
                );
                require(
                    amount + balanceOf(to) <= maxWallet,
                    "Cannot exceed max wallet"
                );
            }
            //when sell
            else if (
                automatedMarketMakerPairs[to] &&
                !isExcludedMaxTransactionAmount[from]
            ) {
                require(
                    amount <= maxTransactionAmount,
                    "Sell transfer amount exceeds the maxTransactionAmount."
                );
            }
        }
        uint256 contractTokenBalance = balanceOf(address(this));
        bool overMinimumTokenBalance = contractTokenBalance >=
            minimumFeeTokensToTake;

        // Take Fee
        if (
            !inSwapAndLiquify &&
            overMinimumTokenBalance &&
            automatedMarketMakerPairs[to]
        ) {
            takeFee();
        }

        removeAllFee();

        buyOrSellSwitch = TRANSFER;

        // If any account belongs to isExcludedFromFee account then remove the fee
        if (!isExcludedFromFee[from] && !isExcludedFromFee[to]) {
            //protect block
            if (
                _protectBlockCount > block.number.sub(_tradingActiveBlock) &&
                (automatedMarketMakerPairs[from] ||
                    automatedMarketMakerPairs[to])
            ) {
                _stakingRewardFee = amount
                    .mul(_protectBlockStakingRewardFee)
                    .div(1000);
                _liquidityFee = amount.mul(_protectBlockLiquidityFee).div(1000);
                _plantingFundFee = amount.mul(_protectBlockPlantingFundFee).div(
                        1000
                    );
                buyOrSellSwitch = PROTECT;
            }
            // Buy
            else if (automatedMarketMakerPairs[from]) {
                _stakingRewardFee = amount.mul(buyStakingRewardFee).div(1000);
                _liquidityFee = amount.mul(buyLiquidityFee).div(1000);
                _plantingFundFee = amount.mul(buyPlantingFundFee).div(1000);
                buyOrSellSwitch = BUY;
            }
            // Sell
            else if (automatedMarketMakerPairs[to]) {
                _stakingRewardFee = amount.mul(sellStakingRewardFee).div(1000);
                _liquidityFee = amount.mul(sellLiquidityFee).div(1000);
                _plantingFundFee = amount.mul(sellPlantingFundFee).div(1000);
                buyOrSellSwitch = SELL;
            } else {
                _stakingRewardFee = amount.mul(transferStakingRewardFee).div(
                    1000
                );
                _liquidityFee = amount.mul(transferLiquidityFee).div(1000);
                _plantingFundFee = amount.mul(transferPlantingFundFee).div(
                    1000
                );
            }
        }

        uint256 _transferAmount = amount
            .sub(_stakingRewardFee)
            .sub(_liquidityFee)
            .sub(_plantingFundFee);
        super._transfer(from, to, _transferAmount);
        uint256 _feeTotal = _stakingRewardFee.add(_liquidityFee).add(
            _plantingFundFee
        );
        if (_feeTotal > 0) {
            super._transfer(from, address(this), _feeTotal);
            _liquidityTokensToSwap = _liquidityTokensToSwap.add(_liquidityFee);
            _plantingFundFeeTokensToSwap = _plantingFundFeeTokensToSwap.add(
                _plantingFundFee
            );
            _stakingRewardFeeTokens = _stakingRewardFeeTokens.add(
                _stakingRewardFee
            );
        }

        restoreAllFee();
    }

    function removeAllFee() private {
        if (
            _stakingRewardFee == 0 &&
            _liquidityFee == 0 &&
            _plantingFundFee == 0
        ) return;

        _previousStakingRewardFee = _stakingRewardFee;
        _previousLiquidityFee = _liquidityFee;
        _previousPlantingFundFee = _plantingFundFee;
        _stakingRewardFee = 0;
        _liquidityFee = 0;
        _plantingFundFee = 0;
    }

    function restoreAllFee() private {
        _stakingRewardFee = _previousStakingRewardFee;
        _liquidityFee = _previousLiquidityFee;
        _plantingFundFee = _previousPlantingFundFee;
    }

    function takeFee() private lockTheSwap {
        uint256 contractBalance = balanceOf(address(this));
        bool success;
        uint256 totalTokensTaken = _liquidityTokensToSwap
            .add(_plantingFundFeeTokensToSwap)
            .add(_stakingRewardFeeTokens);
        if (totalTokensTaken == 0 || contractBalance < totalTokensTaken) {
            return;
        }

        // Halve the amount of liquidity tokens
        uint256 tokensForLiquidity = _liquidityTokensToSwap / 2;
        uint256 initialBNBBalance = address(this).balance;
        swapTokensForBNB(tokensForLiquidity.add(_plantingFundFeeTokensToSwap));
        uint256 bnbBalance = address(this).balance.sub(initialBNBBalance);
        uint256 bnbForPlantingFund = bnbBalance
            .mul(_plantingFundFeeTokensToSwap)
            .div(tokensForLiquidity.add(_plantingFundFeeTokensToSwap));
        uint256 bnbForLiquidity = bnbBalance - bnbForPlantingFund;
        if (tokensForLiquidity > 0 && bnbForLiquidity > 0) {
            addLiquidity(tokensForLiquidity, bnbForLiquidity);
            emit SwapAndLiquify(tokensForLiquidity, bnbForLiquidity);
        }

        _approve(
            address(this),
            address(stakingContract),
            _stakingRewardFeeTokens
        );
        stakingContract.depositReward(_stakingRewardFeeTokens);
        emit StakingRewardTaken(_stakingRewardFeeTokens);

        (success, ) = address(plantingFundFeeAddress).call{
            value: bnbForPlantingFund
        }("");
        emit PlantingFundFeeTaken(
            _plantingFundFeeTokensToSwap,
            bnbForPlantingFund
        );

        _liquidityTokensToSwap = 0;
        _plantingFundFeeTokensToSwap = 0;
        _stakingRewardFeeTokens = 0;
    }

    function swapTokensForBNB(uint256 tokenAmount) private {
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = pancakeRouter.WETH();
        _approve(address(this), address(pancakeRouter), tokenAmount);
        pancakeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0, // accept any amount of ETH
            path,
            address(this),
            block.timestamp
        );
    }

    function addLiquidity(uint256 tokenAmount, uint256 ethAmount) private {
        _approve(address(this), address(pancakeRouter), tokenAmount);
        pancakeRouter.addLiquidityETH{value: ethAmount}(
            address(this),
            tokenAmount,
            0, // slippage is unavoidable
            0, // slippage is unavoidable
            liquidityAddress,
            block.timestamp
        );
    }

    receive() external payable {}
}
