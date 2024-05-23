import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../assets/css/AdminPage.module.css";
import { addCategory, getAllCategories } from "../services/admin";
import { sweetAlert } from "../services/sweetalert";

function AllCategories() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    addCategory(formData)
      .then((response) => {
        sweetAlert({
          title: response.message,
          icon: response.success ? "success" : "error",
        });
        if (response.success) {
          getAllCategories()
            .then((response) => {
              if (response.success) {
                setCategories(response.categories);
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

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        if (response.success) {
          setCategories(response.categories);
        } else {
          setError("Failed to fetch Categories");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function updateFormData(event, fieldname) {
    setFormData({ ...formData, [fieldname]: event.target.value });
  }
  return (
    <div className={styles.allCategories}>
      <h2>All Categories {categories.length}</h2>
      <table className={styles.categoryTable}>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Number of Courses</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.courses.length} courses</td>
              <td>
                <button className={styles.deleteBtn}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className={styles.addCategory} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Category Name"
          value={formData.name}
          onChange={(event) => updateFormData(event, "name")}
        />
        <button className={styles.addCategoryBtn} disabled={loading}>
          Add Category
        </button>
      </form>
    </div>
  );
}
export default AllCategories;
