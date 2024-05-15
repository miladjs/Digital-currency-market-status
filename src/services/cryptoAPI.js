const apiKey = "CG-rRXVAYVbV7jUjFU1mnwrwX5C";
const apiAddress = "https://api.coingecko.com/api/v3";

function AllCoinsAPI(page, currency) {
  return `${apiAddress}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=${apiKey}`;
}
function TopCoinsAPI(currency) {
  return `${apiAddress}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=${apiKey}`;
}
function globalAPI(currency) {
  return `${apiAddress}/global?vs_currency=${currency}&x_cg_demo_api_key=${apiKey}`;
}
function searchAPI(search) {
  return `${apiAddress}/search?query=${search}&x_cg_demo_api_key=${apiKey}`;
}
function CoinAPI(id) {
  return `${apiAddress}/coins/${id}?x_cg_demo_api_key=${apiKey}`;
}
function CoinChartAPI(id, currency, day = 30) {
  return `${apiAddress}/coins/${id}/market_chart?vs_currency=${currency}&days=${day}&interval=daily&x_cg_demo_api_key=${apiKey}`;
}

export {
  AllCoinsAPI,
  TopCoinsAPI,
  globalAPI,
  searchAPI,
  CoinAPI,
  CoinChartAPI,
};
