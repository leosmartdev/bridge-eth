import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { simpleRpcProvider } from '../utils/providers'
import { useSelector } from "react-redux";
// eslint-disable-next-line import/no-unresolved

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React()
  const refEth = useRef(library);
  const network = useSelector((state) => state.network.chainId);
  const [provider, setProvider] = useState(library || simpleRpcProvider(network))

  useEffect(() => {

    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider(chainId ?? network))
      refEth.current = library
    }
  }, [library])

  return { library: provider, chainId: chainId, ...web3React }
}

export default useActiveWeb3React
