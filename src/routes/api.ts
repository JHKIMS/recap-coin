export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
// fetchCoins는 fetch함수를 fetch함수는 URL로부터 json을 return할 것이다.
