import React, { useState } from "react";
import styles from "../assets/css/Profile.module.css"; // Import CSS module

function PaymentMethods() {
 

  return (
    <div className={styles.paymentMethodsContainer}>
      <h2>Payment methods</h2>
      <div className={styles.savedMethods}>
       
          <p>You do not have any saved payment method yet</p>

      </div>
     
    </div>
  );
}

export default PaymentMethods;
