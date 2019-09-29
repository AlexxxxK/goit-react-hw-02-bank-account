import React from "react";
import PropTypes from "prop-types";
import styles from "./Controls.module.css";

const Controls = ({ value, handleAmountSubmit, handleTransaction }) => (
  <section className={styles.controls}>
    <input
      value={value}
      type="number"
      min="0.01"
      step="0.01"
      placeholder="$0.00"
      className={styles.input}
      onChange={handleAmountSubmit}
    />
    <button
      type="button"
      name="deposit"
      className={styles.button}
      onClick={handleTransaction}
    >
      Deposit
    </button>
    <button
      type="button"
      name="withdraw"
      className={styles.button}
      onClick={handleTransaction}
    >
      Withdraw
    </button>
  </section>
);

Controls.propTypes = {
  value: PropTypes.string.isRequired,
  handleAmountSubmit: PropTypes.func.isRequired,
  handleTransaction: PropTypes.func.isRequired,
};

export default Controls;
