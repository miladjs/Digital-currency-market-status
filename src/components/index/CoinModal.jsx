import { useEffect, useState } from "react";
import style from "./CoinModal.module.scss";
import { CoinAPI, CoinChartAPI } from "../../services/cryptoAPI";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ConverData } from "../../utils/ConverData";

function CoinModal({ coinid, currency, setcoinlive }) {
  if (!coinid) return;

  const [coin, SetCoin] = useState(null);
  const [chartprice, setChartPrice] = useState(null);
  const [type, setType] = useState("prices");

  useEffect(() => {
    const getCoin = async () => {
      const res = await fetch(CoinAPI(coinid));
      const data = await res.json();
      SetCoin(data);
    };

    const getCoinChart = async () => {
      const res = await fetch(CoinChartAPI(coinid, currency));
      const data = await res.json();
      setChartPrice(data);
    };

    getCoinChart();
    getCoin();
  }, [coinid]);

  if (!coin) return <div>loading....</div>;

  return (
    <>
      <div className={style.modal}>
        <div className={style.box}>
          <button className={style.close} onClick={() => setcoinlive(null)}>
            <img src="image/close.svg" />
          </button>
          <div className={style.name}>
            <img src={coin?.image?.small} alt={coin?.name} />
            <b>{coin?.name}</b>
          </div>

          <div className={style.status}>
            <div>
              <b>rank</b>
              <span>{coin?.market_cap_rank}</span>
            </div>
            <div>
              <b>price</b>
              <span>
                {coin?.market_data?.current_price[currency]} {currency}
              </span>
            </div>
            <div>
              <b>high 24h</b>
              <span>{coin?.market_data?.high_24h[currency]}</span>
            </div>
          </div>
          <div className={style.graph}>
            <ChartComponent data={ConverData(chartprice, type)} type={type} />
          </div>
          <div className={style.action}>
            <button
              className={type == "market_caps" ? style.active : null}
              name="market_caps"
              onClick={() => setType("market_caps")}
            >
              market caps
            </button>
            <button
              className={type == "prices" ? style.active : null}
              name="prices"
              onClick={() => setType("prices")}
            >
              prices
            </button>
            <button
              className={type == "total_volumes" ? style.active : null}
              name="total_volumes"
              onClick={() => setType("total_volumes")}
            >
              total volumes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CoinModal;

function ChartComponent({ data, type }) {
  return (
    <LineChart width={650} height={250} data={data}>
      <CartesianGrid strokeDasharray="4 4" stroke="#384ebdad" />
      <YAxis dataKey={type} domain={["auto", "auto"]} stroke="#ffffff6e" />
      <XAxis dataKey="date" hide />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={type} stroke="#a4bbcbf2" />
    </LineChart>
  );
}
