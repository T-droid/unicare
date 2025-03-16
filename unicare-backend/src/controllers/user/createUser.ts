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

    const userExists = await findUserByEmail(otherData.email);
    if (userExists.length > 0) {
      res.status(400).json({ message: "User with the email already exists" });
      return;
    }
    console.log(department);

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
