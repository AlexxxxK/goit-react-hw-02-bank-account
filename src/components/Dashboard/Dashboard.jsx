import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import { toast } from "react-toastify";
import Controls from "../Controls/Controls";
import Balance from "../Balance/Balance";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Dashboard.module.css";

toast.configure({
  autoClose: 6000,
  draggable: false,
});

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    inputValue: "",
    deposits: 0,
    withdrawals: 0,
  };

  handleAmountSubmit = event => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleTransaction = event => {
    const { name } = event.target;
    const amount = Math.round(Number(this.state.inputValue) * 100) / 100;

    if (amount <= 0) {
      toast.warn("Введите сумму для проведения операции!");
      return;
    }

    if (name === "withdraw" && amount > this.state.balance) {
      toast.error("На счету недостаточно средств для проведения операции!");
      return;
    }

    const transaction = {
      id: uuidv4(),
      type: name === "deposit" ? "deposit" : "withdrawal",
      amount,
      date: new Date().toLocaleString(),
    };

    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
      balance:
        Math.round(
          (name === "deposit"
            ? prevState.balance + amount
            : prevState.balance - amount) * 100,
        ) / 100,
      [name === "deposit" ? "deposits" : "withdrawals"]:
        name === "deposit"
          ? Math.round((prevState.deposits + amount) * 100) / 100
          : Math.round((prevState.withdrawals + amount) * 100) / 100,
      inputValue: "",
    }));
  };

  render() {
    const {
      inputValue,
      transactions,
      balance,
      withdrawals,
      deposits,
    } = this.state;

    return (
      <div className={styles.dashboard}>
        <Controls
          value={inputValue}
          handleAmountSubmit={this.handleAmountSubmit}
          handleTransaction={this.handleTransaction}
        />
        <Balance
          balance={balance}
          deposits={deposits}
          withdrawals={withdrawals}
        />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}
