import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../assets/css/AdminPage.module.css";
import { addCoupon, deleteCoupon, getAllCoupons } from "../services/admin";
import { sweetAlert } from "../services/sweetalert";

function AllCoupons() {
  const [, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [coupons, setCoupons] = useState([]);
  const updateFormData = (event, fieldname) => {
    setFormData({ ...formData, [fieldname]: event.target.value });
  };

  const handleDeleteCoupon = (coupon) => {
    deleteCoupon(coupon._id)
      .then((response) => {
        sweetAlert({
          title: response.message,
          icon: response.success ? "success" : "error",
        });
        if (response.success) {
          setCoupons((prevCoupons) =>
            prevCoupons.filter((c) => c._id !== coupon._id)
          );
        }
      })
      .catch((error) => {
        sweetAlert({ title: error.message, icon: "error" });
      });
  };

  // handle adding submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    addCoupon(formData)
      .then((response) => {
        sweetAlert({
          title: response.message,
          icon: response.success ? "success" : "error",
        });
        if (response.success) {
          getAllCoupons()
            .then((response) => {
              if (response.success) {
                setCoupons(response.coupons);
              } else {
                setError("Failed to fetch Categories");
              }
              setLoading(false);
            })
            .catch((err) => {
              setError(err.message);
              setLoading(false);
            });
        } else {
          sweetAlert({
            title: response.message,
            icon: "error",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        sweetAlert({
          title: error.message || "An error occurred",
          icon: "error",
        });
        setLoading(false);
      });
  }
  const [loaded, setLoaded] = useState(false);

  let loading = false;
  const setLoading = (value) => {
    loading = value;
  };
  // Fetch users when the component mounts
  useEffect(() => {
    if (loading || loaded) return;
    setLoading(true);
    getAllCoupons()
      .then((response) => {
        if (response.success) {
          setCoupons(response.coupons);
        } else {
          setError("Failed to fetch coupons");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  });

  return (
    <div className={styles.coupons}>
      <div className={styles.couponForm}>
        <h2>Generate Coupon</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Coupon Code"
            className={styles.couponInput}
            value={formData.couponCode || ""}
            onChange={(event) => updateFormData(event, "couponCode")}
            required
          />
          <input
            type="number"
            placeholder="Discount Percentage"
            min="1"
            max="100"
            className={styles.couponInput}
            value={formData.couponAmount || ""}
            onChange={(event) => updateFormData(event, "couponAmount")}
            required
          />
          <input
            type="date"
            placeholder="Valid From"
            className={styles.couponInput}
            value={formData.fromDate || ""}
            onChange={(event) => updateFormData(event, "fromDate")}
            required
          />
          <input
            type="date"
            placeholder="Valid To"
            className={styles.couponInput}
            value={formData.toDate || ""}
            onChange={(event) => updateFormData(event, "toDate")}
            required
          />
          <input
            type="number"
            placeholder="Max Usages"
            min="1"
            className={styles.couponInput}
            value={formData.maxUsage || ""}
            onChange={(event) => updateFormData(event, "maxUsage")}
            required
          />
          <button
            type="submit"
            className={styles.addCouponBtn}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Coupon"}
          </button>
        </form>
      </div>
      <div className={styles.couponTable}>
        <h2>Existing Coupons</h2>
        {/* <select>
          <option value="All">All</option>
          <option value="Approved">Date</option>
          <option value="Disapproved">Max usage</option>
          <option value="banned">Value</option>
        </select> */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Discount Percentage</th>
              <th>Valid From</th>
              <th>Valid To</th>
              <th>Max Usages</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {coupons?.map((coupon, index) => (
              <tr key={coupon.id}>
                <td>{index + 1}</td>
                <td>{coupon.couponCode}</td>
                <td>{coupon.couponAmount}%</td>
                <td>{coupon.fromDate}</td>
                <td>{coupon.toDate}</td>
                <td>{coupon.maxUsage}</td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteCoupon(coupon)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllCoupons;
