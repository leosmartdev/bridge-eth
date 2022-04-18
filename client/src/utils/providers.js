import { ethers } from 'ethers'
import getRpcUrl from './getRpcUrl'


export const simpleRpcProvider =(chainID)=> new ethers.providers.StaticJsonRpcProvider(getRpcUrl(chainID))

export default null
