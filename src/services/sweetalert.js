import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySweetAlert = withReactContent(Swal);

/**
 * @param {import("sweetalert2").SweetAlertOptions} options -- Sweet alert options.
 */
export const sweetAlert = (options) => {
  return new mySweetAlert(options);
};
