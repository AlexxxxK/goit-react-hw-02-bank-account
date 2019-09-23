import React from "react";
import PropTypes from "prop-types";
import styles from "./Balance.module.css";

const Balance = ({ balance, withdrawals, deposits }) => {
  return (
    <section className={styles.balance}>
      <span role="img" aria-label="deposits">
        ⬆️${deposits}
      </span>
      <span role="img" aria-label="withdrawals">
        ⬇️${withdrawals}
      </span>
      <span>Balance: ${balance}</span>
    </section>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  withdrawals: PropTypes.number.isRequired,
  deposits: PropTypes.number.isRequired,
};

export default Balance;
