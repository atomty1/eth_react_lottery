import { useState } from "react"
function JoinLottery(props){
    let {joinThisLottery} = props;
    // let [amount, setAmount] = useState("");
    let [val, setVal]= useState("");
    return(
        <div>
            <input type="number" onInput={e=>setVal(e.target.value)} />
            <button onClick={()=>joinThisLottery(val)}>Join Lottery</button>
        </div>
    );
}
export default JoinLottery;