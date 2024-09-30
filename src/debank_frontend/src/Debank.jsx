import React, { useEffect, useState } from "react";
import './index.scss'; // Assuming your CSS file is named App.css
import debank_logo from './debank_logo.png';
import {debank_backend} from "../../declarations/debank_backend"

function DBank() {
  const [balance, setBalance] = useState(0); // Initial balance
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New state for loading spinner


   async function updateBalance() {
     const newBalance  = await debank_backend.checkBalance()
     setBalance(newBalance);
    } 

    useEffect( () => {
        updateBalance();
  }, []);

  const handleTopUpChange = (e) => {
    setTopUpAmount(parseFloat(e.target.value) || 0);
  };

  const handleWithdrawalChange = (e) => {
    setWithdrawalAmount(parseFloat(e.target.value) || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // disable submit button
    setIsSubmitDisabled(true);
    setIsLoading(true);
    try {
        if(topUpAmount > 0){
            await debank_backend.topUp(topUpAmount);
        }
        if(withdrawalAmount > 0){
            await debank_backend.withdraw(withdrawalAmount);
        }

        await debank_backend.compound();
        await updateBalance();

        setTopUpAmount(0);
        setWithdrawalAmount(0);
        
    } catch (error) {
        console.error("Transaction failed: ", error);
    } finally{
        setIsSubmitDisabled(false);
        setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <img src={debank_logo} alt="DBank logo" width="100" />
      <h1>Current Balance: ${balance.toFixed(2)}</h1>
      <div className="divider"></div>
      <form onSubmit={handleSubmit}>
        <h2>Amount to Top Up</h2>
        <input
          id="input-amount"
          type="number"
          step="0.01"
          min="0"
          value={topUpAmount}
          onChange={handleTopUpChange}
        />
        <h2>Amount to Withdraw</h2>
        <input
          id="withdrawal-amount"
          type="number"
          step="0.01"
          min="0"
          value={withdrawalAmount}
          onChange={handleWithdrawalChange}
        />
        <input id="submit-btn" type="submit" value="Finalise Transaction" disabled={isSubmitDisabled} />
      </form>
       <div className={isLoading ? "spinner" : "spinner-hidden"}></div>
    </div>
  );
}

export default DBank;
