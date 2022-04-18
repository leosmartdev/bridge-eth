import { useMemo } from 'react'
import useActiveWeb3React from '../hooks/useActiveWeb3React'
import TOKEN_ABI from '../config/abi/token.json'
import BRIDGE_ABI from '../config/abi/bridge.json'
import {TOKEN_ADDRESS, BRIDGE_ADDRESS} from '../config/constants'
// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'

import { getContract } from '../utils/contract'


function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React();
  const aa = useActiveWeb3React();


  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(withSignerIfPossible=true) {
  return useContract(TOKEN_ADDRESS, TOKEN_ABI, withSignerIfPossible)
} 

export function useBridgeContract(tokenAddress, withSignerIfPossible=true) {
  return useContract(BRIDGE_ADDRESS, BRIDGE_ABI, withSignerIfPossible)
} 
