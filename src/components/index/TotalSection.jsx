import style from "./TotalSection.module.scss";

function TotalSection({ coinsData, symbol }) {
  if (!coinsData) return "loading...";

  return (
    <div className={style.totalsection}>
      <div className={style.totalstatus}>
        <div>
          <b>Market Cap 24h</b>
          <span>
            {coinsData.market_cap_change_percentage_24h_usd.toFixed(2)}%
          </span>
        </div>
        <div>
          <b>Exchanges</b>
          <span>{coinsData.markets}</span>
        </div>
      </div>
      <div className={style.totalpercentage}>
        <div>
          <b>Coins : </b>
          <span>{coinsData?.active_cryptocurrencies?.toLocaleString()}</span>
        </div>
        <div>
          <b>Dominance : </b>
          <span>BTC {coinsData.market_cap_percentage?.btc?.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
export default TotalSection;
