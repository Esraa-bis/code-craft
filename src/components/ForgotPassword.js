import { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "../assets/css/signForms.module.css";
import { forgetCode } from "../services/auth";
import { sweetAlert } from "../services/sweetalert";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    forgetCode(formData)
      .then((response) => {
        if (response.success) {
          setEmail(encodeURIComponent(formData.email));
        } else {
          sweetAlert({
            title: response.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        sweetAlert({ title: error.message, icon: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function updateFormData(event, fieldName) {
    setFormData({ ...formData, [fieldName]: event.target.value });
  }
  return (
    <section className={`${styles.signFormSection}`}>
      {email && (
        <Navigate to={"/ConfirmationCode?email=" + email} replace={true} />
      )}
      <div className={`${styles.container}`}>
        <h2>Enter your email</h2>

        <form
          id="forgotPasswordForm"
          className={`${styles.signform}`}
          onSubmit={handleSubmit}
        >
          <div className={`${styles.formGroup}`}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.input}`}
              value={formData.email}
              onChange={(event) => updateFormData(event, "email")}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
export default ForgotPassword;
