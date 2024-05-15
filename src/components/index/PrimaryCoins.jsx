import style from "./PrimaryCoins.module.scss";

function PrimaryCoins({ topCoins, symbol, setcoinlive }) {
  return (
    <section className={style.primarycoins}>
      {topCoins.map((coin) => {
        return (
          <CoinCard
            key={coin.id}
            coin={coin}
            symbol={symbol}
            setcoinlive={setcoinlive}
          />
        );
      })}
    </section>
  );
}
export default PrimaryCoins;

function CoinCard({ coin, symbol, setcoinlive }) {
  return (
    <div className={style.coincard} onClick={() => setcoinlive(coin.id)}>
      <b className={style.name}>{coin.name}</b>
      <div className={style.price}>
        <span>{symbol}</span>
        <span>{coin.current_price.toLocaleString()}</span>
      </div>
      <div className={style.tottal}>
        <span>{symbol}</span>
        <span>{coin.market_cap.toLocaleString()}</span>
        <b>Market Cap</b>
      </div>
      <div className={style.oneday}>
        <div>
          <span>{symbol}</span>
          <span>{coin.price_change_24h.toFixed(2)}</span>
        </div>
        <div className={style.percent}>
          <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
          <img
            src={`image/${
              coin.price_change_percentage_24h > 0 ? "upprice" : "downprice"
            }.svg`}
          />
        </div>
      </div>
      <div className={style.icon}>
        <img src={coin.image} alt={coin.name} />
      </div>
    </div>
  );
}
