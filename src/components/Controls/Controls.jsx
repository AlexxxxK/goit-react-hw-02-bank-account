import React from "react";
import PropTypes from "prop-types";
import styles from "./Controls.module.css";

const Controls = ({ handleAmountSubmit, handleDeposit, handleWithdrawal }) => {
  return (
    <section className={styles.controls}>
      <input
        type="number"
        className={styles.input}
        onChange={handleAmountSubmit}
      />
      <button type="button" className={styles.button} onClick={handleDeposit}>
        Deposit
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={handleWithdrawal}>
        Withdraw
      </button>
    </section>
  );
};

Controls.propTypes = {
  handleAmountSubmit: PropTypes.func.isRequired,
  handleDeposit: PropTypes.func.isRequired,
  handleWithdrawal: PropTypes.func.isRequired,
};

export default Controls;
