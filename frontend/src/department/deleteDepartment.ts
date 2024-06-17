import axios from "axios";
import { Department } from "../views/departmentView";
import Swal from "sweetalert2";
import { showDepartment } from "./showDepartment";
import { getAllDepartments } from "./getAllDepartment";

export const deleteDepartment = async (
  app: HTMLDivElement,
  depts: Department[],
  id: string,
) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) {
    return;
  }

  app.innerHTML = `<i class="fa-solid fa-rotate-right animate-spin"></i>`;
  const res = await axios.delete(
    import.meta.env.VITE_API_PATH + `/department/${id}`,
    { withCredentials: true },
  );

  if (res.data.success) {
    Swal.fire({
      title: "Deleted!",
      text: res.data.message,
      icon: "success",
    });
    showDepartment(app, await getAllDepartments());
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: res.data.message,
    });
    showDepartment(app, depts);
  }
};
