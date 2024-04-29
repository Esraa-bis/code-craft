// styles
import styles from "../assets/css/ContactUs.module.css";
// photos
import contactUs from "../assets/images/contuctUs.jpg";

function ContactUs() {
  return (
    <>
      <div className={styles.ContactUsContainer}>
        <div className={styles.contactUsForm}>
          <h2>Contact Us</h2>
          <form className={styles.form}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={styles.input}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={styles.input}
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className={styles.textarea}
            ></textarea>

            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.ContactUsImg}
            src={contactUs}
            alt="contact us"
          />
        </div>
      </div>
    </>
  );
}
export default ContactUs;
