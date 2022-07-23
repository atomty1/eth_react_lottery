import web3 from './web3';
import JoinLottery from './components/join_lottery_form';
import { useState, useEffect } from "react";
import lottery from './lottery';

function App() {
  let [, setAmount] = useState("");
  let [players, setPlayers] = useState([]);
  let [manager, setManager] = useState("");
  let [balance, setBalance] = useState('');
  let [message, setMessage] = useState('');
  let [winner, setWinner] = useState('');
  const joinThisLottery= async val=>{
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting");
    await lottery.methods.joinPool().send(
      {from: accounts[0], value: val}
    );
    setMessage("success");
   
  }
  const pickWinner = async()=>{
    const accounts = await web3.eth.getAccounts();
    setMessage("waiting");
    await lottery.methods.pickWinner().send(
      {
        from: accounts[0]
      }
    );
    setMessage("success");
  }
 useEffect(()=>{
 
  (async()=>{
    let manager = await lottery.methods.manager().call();
    let players = await lottery.methods.getPlayers().call();
    let balance = await web3.eth.getBalance(lottery.options.address);
    let winner = await lottery.methods.winner().call();
    console.log("manager", manager);
    setManager(manager);
    setPlayers(players);
    setBalance(balance);
    setWinner(winner);
  })();
 }, []);
  return (
    <div>
      The last winner is {winner}
      The manager of this contract is {manager}.
      <div>
        There are {players.length} players in this lottery.
      </div>
      You are competing for {balance} wei.
      <div style={{backgroundColor: 'red', color: 'white'}}>
        {message}
      </div>
      <JoinLottery joinThisLottery={joinThisLottery}/>
      <button onClick={pickWinner}>Pick winner</button>
    </div>
  );
}

export default App;
