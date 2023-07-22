import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  margin-bottom: 10px;
  border-radius: 15px;
  color: ${(props) => props.theme.bgColor};
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
    /* 이 부분에 padding값+block속성을 줘서 한줄을 <Link>태그로 클릭할 수 있게 만들어줌 */
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
    display: block;
    text-align: center;
`
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const[coins, setCoins] = useState<CoinInterface[]>([]);
  const[loading, setLoading] = useState(true);
  useEffect(() => {
    (async() =>{
        const response = await fetch("https://api.coinpaprika.com/v1/coins");
        const json = await response.json();
        setCoins(json.slice(0,10));
        setLoading(false);
    })()
  },[])
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>"Loading..."</Loader>
      ):(
        <CoinList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={{
                pathname: `/${coin.id}`,
                state: {name: coin.name}
            }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                {coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinList>
      )}
      
    </Container>
  );
}
export default Coins;
