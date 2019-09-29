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
    inputAmount: "",
  };

  handleAmountSubmit = ({ target }) => {
    this.setState({
      inputAmount: target.value,
    });
  };

  handleTransaction = ({ target }) => {
    const { name } = target;
    const amount = Number(this.state.inputAmount);
    const balance =
      Math.round(
        this.state.transactions.reduce(
          (sum, transaction) =>
            transaction.type === "deposit"
              ? sum + transaction.amount
              : sum - transaction.amount,
          0,
        ) * 100,
      ) / 100;
    const regex = /^\d+(\.\d{0,2})?$/g;

    if (amount <= 0 || !regex.test(this.state.inputAmount)) {
      toast.warn("Введите сумму для проведения операции!");
      return;
    }

    if (name === "withdraw" && amount > balance) {
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
      inputAmount: "",
    }));
  };

  render() {
    const { inputAmount, transactions } = this.state;

    return (
      <div className={styles.dashboard}>
        <Controls
          value={inputAmount}
          handleAmountSubmit={this.handleAmountSubmit}
          handleTransaction={this.handleTransaction}
        />
        <Balance transactions={transactions} />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}
