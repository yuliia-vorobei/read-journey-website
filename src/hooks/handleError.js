import swal from "sweetalert";
import "./handleError.css";

export const handleError = (status) => {
  switch (status) {
    case 400:
      swal({
        title: "Invalid request",
        icon: "error",
        button: "Close",
        className: "my-swal-modal",
      });
      break;
    case 401:
      swal({
        title: "Unauthorized",
        icon: "error",
        button: "Close",
        className: "my-swal-modal",
      });
      break;
    case 404:
      swal({
        title: "Not found",
        text: "Page is not found",
        icon: "error",
        button: "Close",
        className: "my-swal-modal",
      });
      break;
    case 409:
      swal({
        title: "Such data already exists",
        className: "my-swal-modal",
        button: "Close",
      });
      break;
    case 500:
      swal({
        title: "Server error, try again later",
        className: "my-swal-modal",
        button: "Close",
      });
      break;
  }
};
