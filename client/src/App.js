import { useEffect } from "react";
import Router from "./router";
import ThemeConfig from "./theme";
import { useDispatch, useSelector } from "react-redux";
import useEagerConnect from "./hooks/useEagerConnect";
import { switchNetwork } from "./redux/slices/network";

function App() {
  useEagerConnect();
  const dispatch = useDispatch();
  const provider = window.ethereum;

  useEffect(() => {
    if (provider)
      provider.on('chainChanged', (chainId) => {
        if (chainId == 1 || chainId == 56 || chainId==137){
          console.log(chainId);
          dispatch(switchNetwork(chainId));
        }
          
      });
  }, [dispatch]);
  

  return (
    <>
      <ThemeConfig>
        <Router />
      </ThemeConfig>
    </>
  );
}

export default App;
