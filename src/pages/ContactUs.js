// styles
import { useState } from "react";
import styles from "../assets/css/ContactUs.module.css";
// photos
import contactUsImg from "../assets/images/contuctUs.jpg";
import { contactUs } from "../services/contactUs";
import { sweetAlert } from "../services/sweetalert";

// function ContactUs() {
//   const [formData, setFormData] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState(null);
//   const [loaded, setLoaded] = useState(false);
//   let loading = false;
//   const setLoading = (value) => {
//     loading = value;
//   };
//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     contactUs(formData)
//       .then((response) => {
//         sweetAlert({
//           title: response.message,
//           icon: response.success ? "success" : "error",
//         });
//         if (response.success) {
//           contactUs()
//             .then((response) => {
//               if (response.success) {
//                 setCategories(response.categories);
//               } else {
//                 setError("Failed to fetch Categories");
//               }
//               setLoading(false);
//             })
//             .catch((err) => {
//               setError(err.message);
//               setLoading(false);
//             });
//         } else {
//           sweetAlert({
//             title: response.message,
//             icon: "error",
//           });
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         sweetAlert({
//           title: error.message || "An error occurred",
//           icon: "error",
//         });
//         setLoading(false);
//       });
//   }
//   function updateFormData(event, fieldname) {
//     if (fieldname === "file") {
//       setFormData((formData) => ({
//         ...formData,
//         [fieldname]: event.target.files[0],
//       }));
//     } else {
//       setFormData((formData) => ({
//         ...formData,
//         [fieldname]: event.target.value,
//       }));
//     }
//   }
//   return (
//     <>
//       <div className={styles.ContactUsContainer}>
//         <div className={styles.contactUsForm}>
//           <h2>Contact Us</h2>
//           <form className={styles.form} onSubmit={handleSubmit}>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               id="name"
//               name="name"
//               required
//               value={formData.name}
//               onChange={(event) => updateFormData(event, "name")}
//               className={styles.input}
//             />

//             <label htmlFor="email">Email:</label>
//             <input
//               placeholder="enter email that you signed in with "
//               type="email"
//               id="email"
//               name="email"
//               required
//               value={formData.email}
//               onChange={(event) => updateFormData(event, "email")}
//               className={styles.input}
//             />
//             <label htmlFor="phoneNumber">Phone number:</label>
//             <input
//               placeholder="enter your phone "
//               type="tel"
//               id="phoneNumber"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={(event) => updateFormData(event, "phoneNumber")}
//               required
//               className={styles.input}
//             />
//             <label htmlFor="message">Message:</label>
//             <textarea
//               id="message"
//               name="message"
//               rows="5"
//               value={formData.message}
//               onChange={(event) => updateFormData(event, "message")}
//               required
//               className={styles.textarea}
//             ></textarea>
//             <label htmlFor="file"></label>
//             <input
//               placeholder="enter email that you signed in with "
//               type="file"
//               name="file"
//               accept="image/*"
//               onChange={(event) => updateFormData(event, "file")}
//               className={styles.input}
//             />
//             <button type="submit" className={styles.button}>
//               Send
//             </button>
//           </form>
//         </div>
//         <div className={styles.imageContainer} disabled={loading}>
//           <img
//             className={styles.ContactUsImg}
//             src={contactUs}
//             alt="contact us"
//           />
//         </div>
//       </div>
//     </>
//   );
// }
// export default ContactUs;

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    file: null,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await contactUs(formData);
      sweetAlert({
        title: response.message,
        icon: response.success ? "success" : "error",
      });
    } catch (error) {
      sweetAlert({
        title: error.message || "An error occurred",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  function updateFormData(event, fieldname) {
    const value =
      fieldname === "file" ? event.target.files[0] : event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldname]: value,
    }));
  }

  return (
    <div className={styles.ContactUsContainer}>
      <div className={styles.contactUsForm}>
        <h2>Contact Us</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(event) => updateFormData(event, "name")}
            className={styles.input}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter the email you signed in with"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={(event) => updateFormData(event, "email")}
            className={styles.input}
          />

          <label htmlFor="phoneNumber">Phone number:</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            id="phoneNumber"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={(event) => updateFormData(event, "phoneNumber")}
            className={styles.input}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            placeholder="Write your message here....."
            value={formData.message}
            onChange={(event) => updateFormData(event, "message")}
            className={styles.textarea}
          ></textarea>

          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={(event) => updateFormData(event, "file")}
            className={styles.input}
          />

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.ContactUsImg}
          src={contactUsImg}
          alt="Contact Us"
        />
      </div>
    </div>
  );
}

export default ContactUs;
