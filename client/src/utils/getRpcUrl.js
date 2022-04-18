import random from 'lodash/random'

// Array of available nodes to connect to

export const nodes ={
  "56" :[process.env.REACT_APP_BSC_NODE_1, process.env.REACT_APP_BSC_NODE_2, process.env.REACT_APP_BSC_NODE_3],
  "137" :[process.env.REACT_APP_POLYGON_NODE],
  "1" : [process.env.REACT_APP_ETHEREUM_NODE],
} 

const getNodeUrl = (network) => {
    const randomIndex = random(0, nodes[network].length - 1)
    return nodes[network][randomIndex]
  
}

export default getNodeUrl
