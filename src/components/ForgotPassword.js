
import styles from "../css/signForms.module.css"

 function ForgotPassword() {
   return (
     <section className={`${styles.signFormSection}`}>
      <div className={`${styles.container}`}>
               <h2>Enter your email</h2>
               
        <form id="forgotPasswordForm" method="post" api="auth/logIn" className={`${styles.signform}`}>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className={`${styles.input}`} required />
                   </div>
                   {/* the link needed to be removed*/}
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
export default ForgotPassword;
