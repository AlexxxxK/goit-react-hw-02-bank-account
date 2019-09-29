import React from "react";
import PropTypes from "prop-types";
import styles from "./Balance.module.css";

const Balance = ({ transactions }) => (
  <section className={styles.balance}>
    <span role="img" aria-label="deposits">
      ⬆️$
      {Math.round(
        transactions.reduce(
          (sum, transaction) =>
            transaction.type === "deposit" ? sum + transaction.amount : sum,
          0,
        ) * 100,
      ) / 100}
    </span>
    <span role="img" aria-label="withdrawals">
      ⬇️$
      {Math.round(
        transactions.reduce(
          (sum, transaction) =>
            transaction.type === "withdrawal" ? sum + transaction.amount : sum,
          0,
        ) * 100,
      ) / 100}
    </span>
    <span>
      Balance: $
      {Math.round(
        transactions.reduce(
          (sum, transaction) =>
            transaction.type === "deposit"
              ? sum + transaction.amount
              : sum - transaction.amount,
          0,
        ) * 100,
      ) / 100}
    </span>
  </section>
);

Balance.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Balance;
