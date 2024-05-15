import { useEffect, useState } from "react";
import style from "./TableCoins.module.scss";

function TableCoins({ coins, symbol, setPage, page, setcoinlive }) {
  const PageHandler = (e) => {
    switch (e.target.name) {
      case "prevent":
        page <= 1 ? null : setPage((i) => i - 1);
        break;
      case "next":
        setPage((i) => (i >= 25 ? 25 : i + 1));
        break;
      case "1":
        setPage(1);
        break;
      case "25":
        setPage(25);
        break;
      default:
        setPage(1);
    }
  };
  return (
    <>
      <section className={style.mainbox}>
        <table>
          <thead>
            <tr className={style.cointh}>
              <td className={style.rank}>
                <div>rank</div>
              </td>
              <td className={style.name}>
                <div>Coin</div>
              </td>
              <td className={style.price}>
                <div>Price</div>
              </td>
              <td className={style.change}>
                <div>1h</div>
              </td>
              <td className={style.change}>
                <div>24h</div>
              </td>

              <td>
                <div>24h Volume</div>
              </td>
              <td>
                <div>Market Cap</div>
              </td>
              <td className={style.last}>
                <div>Last 7 Days</div>
              </td>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              return (
                <CoinRow
                  key={coin.id}
                  coin={coin}
                  symbol={symbol}
                  setcoinlive={setcoinlive}
                />
              );
            })}
          </tbody>
        </table>
      </section>
      <div className={style.pagination}>
        {page <= 1 ? null : (
          <button name="prevent" onClick={PageHandler}>
            prevent
          </button>
        )}
        <button
          name="1"
          className={page == 1 ? style.active : null}
          onClick={PageHandler}
        >
          1
        </button>
        {page > 1 || page > 25 ? (
          <>
            <span>...</span>
            <button className={page > 1 && page < 25 ? style.active : null}>
              {page}
            </button>
          </>
        ) : null}
        <span>...</span>
        <button
          className={page == 25 ? style.active : null}
          name="25"
          onClick={PageHandler}
        >
          25
        </button>
        {page >= 25 ? null : (
          <button name="next" onClick={PageHandler}>
            next
          </button>
        )}
      </div>
    </>
  );
}
export default TableCoins;

function CoinRow({ coin, symbol, setcoinlive }) {
  return (
    <tr className={style.coinRow} onClick={() => setcoinlive(coin.id)}>
      <td className={style.rank}>
        <div>{coin.market_cap_rank}</div>
      </td>
      <td className={style.name}>
        <div>
          <img src={coin.image} alt={coin.name} />
          <b>{coin.name}</b>
        </div>
      </td>
      <td className={style.price}>
        <div>
          <span>{symbol}</span>
          {coin.current_price.toLocaleString()}
        </div>
      </td>
      <td
        className={
          coin.price_change_percentage_1h_in_currency > 0
            ? style.green
            : style.red
        }
      >
        <div>{coin.price_change_percentage_1h_in_currency.toFixed(2)}%</div>
      </td>
      <td
        className={
          coin.price_change_percentage_24h_in_currency > 0
            ? style.green
            : style.red
        }
      >
        <div>{coin.price_change_percentage_24h_in_currency.toFixed(2)}%</div>
      </td>

      <td>
        <div>
          {symbol}
          {coin.total_volume.toLocaleString()}
        </div>
      </td>
      <td>
        <div>
          {symbol}
          {coin.market_cap.toLocaleString()}
        </div>
      </td>
      <td className={style.lastprice}>
        <div>
          <span>{coin.price_change_percentage_7d_in_currency.toFixed(2)}%</span>
          <img
            src={`image/${
              coin.market_cap_change_percentage_24h > 0
                ? "upprice"
                : "downprice"
            }.svg`}
          />
        </div>
      </td>
    </tr>
  );
}
