import { useEffect, useState } from "react";
import style from "./Header.module.scss";
import { GoSearch } from "react-icons/go";
import { searchAPI } from "../../services/cryptoAPI";
import CoinModal from "../index/CoinModal";

function Header({ setCurrency, setcoinlive }) {
  const [search, setSearch] = useState("");
  const [coinlist, setCoinlist] = useState([]);
  const changeCurreny = (e) => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    if (search.length < 1) {
      setCoinlist([]);
      return;
    }
    let controller = new AbortController();
    const searchFun = async () => {
      const res = await fetch(searchAPI(search), {
        signal: controller.signal,
      });
      const data = await res.json();
      setCoinlist(data.coins);
      controller = null;
    };

    searchFun();

    return () => {
      controller?.abort();
    };
  }, [search]);

  const SearchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <b>Crypto </b>
        <span>Market</span>
      </div>
      <div className={style.search}>
        <select onChange={changeCurreny}>
          <option value="usd">$ Dollar</option>
          <option value="eur">€ Euro</option>
          <option value="jpy">¥ Yen</option>
        </select>
        <div>
          <input
            type="text"
            name=""
            id=""
            placeholder="search coins"
            onChange={SearchHandler}
          />
          <GoSearch />

          <div
            className={`${style.searchbox} ${
              search.length > 1 ? style.active : null
            }`}
          >
            <ul>
              {coinlist.map((coin) => {
                return (
                  <li key={coin.id} onClick={() => setcoinlive(coin.id)}>
                    <img src={coin.thumb} />
                    <b>{coin.name}</b>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
