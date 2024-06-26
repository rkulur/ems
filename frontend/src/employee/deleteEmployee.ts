import axios from "axios";
import { Department } from "../views/departmentView";
import { Employee } from "../views/employeeView";
import { insertTableInSection } from "./showEmployee";
import { getAllEmployees } from "./getAllEmployees";
import Swal from "sweetalert2";
import { getAllEmployeeByDeptId } from "./getEmployeeByDeptId";
import { slider } from "../views/spinner";

export const deleteEmployee = async (
  empTableSection: HTMLElement,
  emps: Employee[],
  depts: Department[],
  id: string,
  deptno: string,
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

  empTableSection.innerHTML = slider;
  const res = await axios.delete(
    import.meta.env.VITE_API_PATH + `/employee/${id}`,
    { withCredentials: true },
  );

  if (res.data.success) {
    Swal.fire({
      title: "Deleted!",
      text: res.data.message,
      icon: "success",
    });
    insertTableInSection(
      empTableSection,
      deptno === "0"
        ? await getAllEmployees()
        : await getAllEmployeeByDeptId(deptno),
      depts,
      deptno,
    );
  } else {
    Swal.fire({
      title: "Oops...",
      text: res.data.message,
      icon: "error",
    });
    insertTableInSection(empTableSection, emps, depts, deptno);
  }
};
