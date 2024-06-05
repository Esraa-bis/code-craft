import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "../assets/css/signForms.module.css";
import { checkCode, forgetCode } from "../services/auth";
import { sweetAlert } from "../services/sweetalert";

function ConfirmationCode() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const email = query.get("email");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ forgetCode: "" });
  const [code, setCode] = useState(false);
  const [timer, setTimer] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    checkCode({ email, forgetCode: formData.forgetCode })
      .then((response) => {
        if (response.success) {
          setCode(true);
          encodeURIComponent(email);
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

  function updateFormData(event, fieldname) {
    setFormData({ ...formData, [fieldname]: event.target.value });
  }

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    forgetCode({ email });
    setTimer(30); // Set the timer to 30 seconds
  };
  return (
    <section className={`${styles.signFormSection}`}>
      {code && (
        <Navigate
          to={"/ResetPassword?email=" + encodeURIComponent(email)}
          replace={true}
        />
      )}
      <div className={`${styles.container}`}>
        <h2>Confirmation Code</h2>
        <form
          id="forgotPasswordForm"
          className={`${styles.signform}`}
          onSubmit={handleSubmit}
        >
          <div className={`${styles.formGroup}`}>
            <label htmlFor="Confirmation Code">Code:</label>
            <input
              type="number"
              id="Confirmation Code"
              name="Confirmation Code"
              className={`${styles.input}`}
              value={formData.forgetCode}
              onChange={(event) => updateFormData(event, "forgetCode")}
              required
            />
            <button
              onClick={handleResend}
              className={styles.resendCode}
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Resend Code?"}
            </button>
          </div>

          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default ConfirmationCode;
