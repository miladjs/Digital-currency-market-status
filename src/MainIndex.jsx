import { useEffect } from "react";
import PrimaryCoins from "./components/index/PrimaryCoins";
import TotalSection from "./components/index/TotalSection";
import TableCoins from "./components/index/tableCoins";
import { useState } from "react";
import { AllCoinsAPI, TopCoinsAPI, globalAPI } from "./services/cryptoAPI";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CoinModal from "./components/index/CoinModal";

function MainIndex() {
  const [coins, setCoins] = useState([]);
  const [topCoins, setTopCoins] = useState([]);
  const [globalData, setGlobalData] = useState();
  const [currency, setCurrency] = useState("usd");
  const [page, setPage] = useState(1);
  const [symbol, setSymbol] = useState("$");
  const [coinlive, setcoinlive] = useState(null);

  useEffect(() => {
    switch (currency) {
      case "eur":
        setSymbol("€");
        break;
      case "jpy":
        setSymbol("¥");
        break;
      default:
        setSymbol("$");
    }

    const getAllCoins = async () => {
      const res = await fetch(AllCoinsAPI(page, currency));
      const data = await res.json();
      setCoins(data);
    };

    const getTopCoins = async () => {
      const res = await fetch(TopCoinsAPI(currency));
      const data = await res.json();
      setTopCoins(data);
    };
    const getGlobalCoins = async () => {
      const res = await fetch(globalAPI(currency));
      const data = await res.json();
      setGlobalData(data.data);
    };

    getGlobalCoins();
    getTopCoins();
    getAllCoins();
  }, [currency, page]);

  return (
    <>
      <CoinModal
        coinid={coinlive}
        currency={currency}
        setcoinlive={setcoinlive}
      />
      <Header setCurrency={setCurrency} setcoinlive={setcoinlive} />
      <PrimaryCoins
        topCoins={topCoins}
        symbol={symbol}
        setcoinlive={setcoinlive}
      />
      <TotalSection coinsData={globalData} symbol={symbol} />
      <TableCoins
        coins={coins}
        symbol={symbol}
        page={page}
        setPage={setPage}
        setcoinlive={setcoinlive}
      />
      <Footer />
    </>
  );
}

export default MainIndex;
