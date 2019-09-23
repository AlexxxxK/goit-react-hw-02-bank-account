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
  constructor() {
    super();
    this.state = {
      transactions: [],
      balance: 0,
    };
    this.deposits = 0;
    this.withdrawals = 0;
    this.amount = 0;
  }

  handleAmountSubmit = event => {
    this.amount = Math.round(Number(event.target.value) * 100) / 100;
  };

  handleDeposit = () => {
    if (this.amount <= 0) {
      toast.warn("Введите сумму для проведения операции!");
      return;
    }

    const transaction = {
      id: uuidv4(),
      type: "deposit",
      amount: this.amount,
      date: new Date().toLocaleString(),
    };

    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
      balance: Math.round((prevState.balance + this.amount) * 100) / 100,
    }));

    this.deposits = Math.round((this.deposits + this.amount) * 100) / 100;
  };

  handleWithdrawal = () => {
    if (this.amount <= 0) {
      toast.warn("Введите сумму для проведения операции!");
      return;
    }

    if (this.amount > this.state.balance) {
      toast.error("На счету недостаточно средств для проведения операции!");
      return;
    }

    const transaction = {
      id: uuidv4(),
      type: "withdrawal",
      amount: this.amount,
      date: new Date().toLocaleString(),
    };

    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
      balance: Math.round((prevState.balance - this.amount) * 100) / 100,
    }));

    this.withdrawals = Math.round((this.withdrawals + this.amount) * 100) / 100;
  };

  render() {
    const { transactions, balance } = this.state;

    return (
      <div className={styles.dashboard}>
        <Controls
          handleAmountSubmit={this.handleAmountSubmit}
          handleDeposit={this.handleDeposit}
          handleWithdrawal={this.handleWithdrawal}
        />
        <Balance
          balance={balance}
          deposits={this.deposits}
          withdrawals={this.withdrawals}
        />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}
