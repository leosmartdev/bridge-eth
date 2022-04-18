import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useActiveWeb3React from "./useActiveWeb3React";
import { useSelector } from "react-redux";

// const useTokenBalance = (tokenAddress, walletAddress) => {
//   const { library, account } = useWeb3React();
//   const signer = library?.getSigner();
//   const address = walletAddress ? walletAddress : account;

//   const [balanceState, setBalanceState] = useState({
//     balance: 0,
//     fetchStatus: "Not fetched",
//   });

//   useEffect(() => {
//     const fetchBalance = async () => {
//       const contract = getBep20Contract(tokenAddress, signer);
//       console.log(address);
//       try {
//         console.log("res");
//         const res = await contract.balanceOf(address);
//         console.log(res);
//         setBalanceState({
//           balance: ethers.utils.formatUnits(res, 9),
//           fetchStatus: "Success",
//         });
//       } catch (e) {
//         console.error(e);
//         setBalanceState((prev) => ({
//           ...prev,
//           fetchStatus: "Failed",
//         }));
//       }
//     };

//     if (address) {
//       fetchBalance();
//     }
//   }, [address, tokenAddress]);

//   return balanceState;
// };

export const useGetBnbBalance = () => {
  const [balance, setBalance] = useState(0);
  const { account, library } = useActiveWeb3React();
  
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await library?.getBalance(account);        
        setBalance(ethers.utils.formatUnits(walletBalance, 18))
      } catch(err) {console.log(err);}
    };

    if (account) {
      fetchBalance();
    }
  }, [library, account, setBalance]);

  return { balance };
};

export default useGetBnbBalance;
