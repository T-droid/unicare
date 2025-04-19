import { Request, Response } from "express";
import { findDepartmentByName } from "../../services/departmentService";
import { findUserByEmail, saveUser } from "../../services/userService";
import { generateToken, hashPassword } from "../../util/password";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let { department, ...otherData } = req.body;
    department = await findDepartmentByName(department);

    if (department.length === 0) {
      res.status(400).json({ message: "Department not found" });
      return;
    }
    

    const userExists = await findUserByEmail(otherData.email);
    if (userExists.length > 0) {
      res.status(400).json({ message: "User with the email already exists" });
      return;
    }
    console.log("department");

    if (otherData.role === "admin") {
      if (!otherData.secretKey && otherData.secretKey !== "IamAdmin") {
        res.status(400).json({ message: "Invalid secret key" });
        return;
      }
    }

    let payload = {
      department_id: department[0].id,
      name: otherData.name,
      phone_number: otherData.phone_number,
      work_id: otherData.work_id,
      password: otherData.password,
      email: otherData.email,
      role: otherData.role,
    };
    const savedObject = await saveUser(payload);

    const jwtData = {
      id: savedObject[0].id,
      role: savedObject[0].role,
      email: savedObject[0].email,
    };

    if (jwtData.role !== "admin") {
      // populate staff table
      const newStaff = await createStaff({
        id: savedObject[0].id,
        department_id: otherData.department_id,
      });
      if (newStaff.length === 0) {
        await deleteUserById(savedObject[0].id);
        res.status(500).json({
          message: "Error occurred",
        });
        return;
      }
    }

    const token = generateToken(jwtData);

    res.status(200).json({
      message: "User created",
      err: false,
      token,
      data: savedObject[0],
    });
    return;
  } catch (error) {
    console.log("Error during user creation: ", error);
    res.status(500).json({
      message: "Error occurred",
    });
    return;
  }
};
