// src/components/Checkout.js
import React, { useEffect, useState } from "react";
import styles from "../assets/css/Checkout.module.css";
import Etisalat from "../assets/images/etisalat.png";
import Orange from "../assets/images/orange.png";
import Paymob from "../assets/images/paymob.png";
import Stripe from "../assets/images/stripe.png";
import Vodafone from "../assets/images/vodafone.png";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { coursePreview } from "../services/course";
import { createOrder, payWithStripe } from "../services/order";
import { sweetAlert } from "../services/sweetalert";

function completeCheckout() {
  // Add your checkout logic here
  alert("Checkout completed!");
}

function Checkout() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const [formData, setFormData] = useState({});
  const [res, setRes] = useState({});
  const [course, setCourse] = useState(null);
  const [cart, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);
    const [stripeLink, setStripeLink] = useState(true);

  const [error, setError] = useState(null);
  const query = useQuery();
  const courseId = query.get("courseId");
  const cartId = query.get("cartId");

  useEffect(() => {
    setLoading(true);
    coursePreview(courseId)
      .then((response) => {
        if (response.success) {
          setCourse(response.course);
        } else {
          setError("Failed to fetch course preview");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>No preview available for this course.</div>;
  }
  // handle create order
  const updateFormData = (event, fieldname) => {
    setFormData({ ...formData, [fieldname]: event.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    createOrder({
      course: courseId,
      couponCode: formData.couponCode,
      paymentMethod: formData.paymentMethod,
    })
      .then((response) => {
        if (response.success) {
          payWithStripe(response.order._id).then((response) =>
          {
            if (response.success) {  window.location.href = response.checkOutSession.url ;}
          });
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

  return (
    <section className={styles.CheckoutPage}>
      <section className={styles.OrderDetails}>
        <h2>Order details</h2>
        <div>
          <div className={styles.item}>
            <img
              src={course.image.url}
              alt="course"
              className={styles.courseImg}
            />
            <div className={styles.Content}>
              <h5 className={styles.courseTitle}>{course.courseName}</h5>
              <p className={styles.courseDescription} title={course.desc}>
                {course.desc}
              </p>
              <p className={styles.price}>{course.basePrice} LE</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.CheckoutContainer}>
        <h1 className={styles.Title}>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.PaymentSection}>
            <div className={styles.PaymentHeader}>
              <h2>Payment Methods</h2>
              <p className={styles.SecureConnection}>
                Secured connection <FontAwesomeIcon icon={faLock} />
              </p>
            </div>
            <div className={styles.PaymentOption}>
              <input
                type="radio"
                id="paymob"
                value="paymob"
                name="paymentMethod"
                className={styles.RadioInput}
                onChange={(event) => updateFormData(event, "paymentMethod")}
                checked={formData.paymentMethod === "paymob"}
              />
              <label htmlFor="paymob" className={styles.PaymentLabel}>
                <img
                  src={Paymob}
                  alt="Paymob"
                  className={styles.PaymentImage}
                />
                <span>Paymob</span>
              </label>
            </div>
            <div className={styles.PaymentOption}>
              <input
                type="radio"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                className={styles.RadioInput}
                checked={formData.paymentMethod === "Stripe"}
                onChange={(event) => updateFormData(event, "paymentMethod")}
              />
              <label htmlFor="Stripe" className={styles.PaymentLabel}>
                <img
                  src={Stripe}
                  alt="Stripe"
                  className={styles.PaymentImage}
                />
                <span>Stripe</span>
              </label>
            </div>
          </div>
          <div className={styles.TotalSection}>
            <h3>
              <span>Total:</span> 1000 LE
            </h3>
            <input
              type="text"
              placeholder="Add your coupon here"
              className={styles.CouponInput}
            />
            <button
              type="submit"
              className={styles.CompleteCheckoutButton}
              disabled={loading}
            >
              Complete Checkout
            </button>
          </div>
        </form>

        <div>
          <p>Or now you can pay you order via any mobile wallet</p>
          <div className={styles.PaymentOption}>
            <label htmlFor="Vodafone" className={styles.PaymentLabel}>
              <img
                src={Vodafone}
                alt="Vodafone"
                className={styles.PaymentImage}
              />
              <span>Vodafone Cash</span>
            </label>
            <span className={styles.phoneNumber}>01012824981</span>
          </div>
          <div className={styles.PaymentOption}>
            <label htmlFor="Etisalat" className={styles.PaymentLabel}>
              <img
                src={Etisalat}
                alt="Etisalat"
                className={styles.PaymentImage}
              />
              <span>Etisalat Cash</span>
            </label>
            <span className={styles.phoneNumber}>01112824981</span>
          </div>
          <div className={styles.PaymentOption}>
            <label htmlFor="Orange" className={styles.PaymentLabel}>
              <img src={Orange} alt="Orange" className={styles.PaymentImage} />
              <span>Orange money</span>
            </label>
            <span className={styles.phoneNumber}>01212824981</span>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Checkout;
