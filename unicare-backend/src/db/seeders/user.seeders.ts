import { db } from "..";
import { hashPassword } from "../../util/password";
import {
  DepartmentsTable,
  UserTable,
  StudentTable,
  AppointmentsTable,
  RoomsTable,
  DrugsTable,
} from "./../schema";

export const seedStudents = async () => {
  try {
    // Hash passwords for users
    const hashedPassword = await hashPassword("qwerty");

    // Seed Departments
    const departments = [
      { name: "Cardiology" },
      { name: "Neurology" },
      { name: "Pediatrics" },
      { name: "Orthopedics" },
      { name: "Radiology" },
      { name: "Oncology" },
      { name: "Dermatology" },
      { name: "Psychiatry" },
      { name: "Emergency" },
      { name: "General Medicine" },
    ];
    await db.insert(DepartmentsTable).values(
      departments.map((dept) => ({
        name: dept.name,
      })),
    );

    // Seed Users

    // Seed Students
    const students = [
      {
        name: "Alice Johnson",
        phone_number: "9876543210",
        reg_no: "CS2023/001",
        emergency_contact: "9876543211",
        special_conditions: "None",
      },
      {
        name: "Bob Smith",
        phone_number: "9876543212",
        reg_no: "CS2023/002",
        emergency_contact: "9876543213",
        special_conditions: "Asthma",
      },
      {
        name: "Charlie Brown",
        phone_number: "9876543214",
        reg_no: "CS2023/003",
        emergency_contact: "9876543215",
        special_conditions: "Diabetes",
      },
      {
        name: "Diana Prince",
        phone_number: "9876543216",
        reg_no: "CS2023/004",
        emergency_contact: "9876543217",
        special_conditions: "None",
      },
      {
        name: "Ethan Hunt",
        phone_number: "9876543218",
        reg_no: "CS2023/005",
        emergency_contact: "9876543219",
        special_conditions: "None",
      },
      {
        name: "Fiona Gallagher",
        phone_number: "9876543220",
        reg_no: "CS2023/006",
        emergency_contact: "9876543221",
        special_conditions: "Hypertension",
      },
      {
        name: "George Miller",
        phone_number: "9876543222",
        reg_no: "CS2023/007",
        emergency_contact: "9876543223",
        special_conditions: "None",
      },
      {
        name: "Hannah Baker",
        phone_number: "9876543224",
        reg_no: "CS2023/008",
        emergency_contact: "9876543225",
        special_conditions: "None",
      },
      {
        name: "Isaac Newton",
        phone_number: "9876543226",
        reg_no: "CS2023/009",
        emergency_contact: "9876543227",
        special_conditions: "None",
      },
      {
        name: "Julia Roberts",
        phone_number: "9876543228",
        reg_no: "CS2023/010",
        emergency_contact: "9876543229",
        special_conditions: "None",
      },
      {
        name: "Kevin Hart",
        phone_number: "9876543230",
        reg_no: "CS2023/011",
        emergency_contact: "9876543231",
        special_conditions: "None",
      },
      {
        name: "Laura Palmer",
        phone_number: "9876543232",
        reg_no: "CS2023/012",
        emergency_contact: "9876543233",
        special_conditions: "None",
      },
      {
        name: "Michael Scott",
        phone_number: "9876543234",
        reg_no: "CS2023/013",
        emergency_contact: "9876543235",
        special_conditions: "None",
      },
      {
        name: "Nancy Drew",
        phone_number: "9876543236",
        reg_no: "CS2023/014",
        emergency_contact: "9876543237",
        special_conditions: "None",
      },
      {
        name: "Oscar Wilde",
        phone_number: "9876543238",
        reg_no: "CS2023/015",
        emergency_contact: "9876543239",
        special_conditions: "None",
      },
      {
        name: "Pam Beesly",
        phone_number: "9876543240",
        reg_no: "CS2023/016",
        emergency_contact: "9876543241",
        special_conditions: "None",
      },
      {
        name: "Quincy Adams",
        phone_number: "9876543242",
        reg_no: "CS2023/017",
        emergency_contact: "9876543243",
        special_conditions: "None",
      },
      {
        name: "Rachel Green",
        phone_number: "9876543244",
        reg_no: "CS2023/018",
        emergency_contact: "9876543245",
        special_conditions: "None",
      },
      {
        name: "Steve Rogers",
        phone_number: "9876543246",
        reg_no: "CS2023/019",
        emergency_contact: "9876543247",
        special_conditions: "None",
      },
      {
        name: "Tony Stark",
        phone_number: "9876543248",
        reg_no: "CS2023/020",
        emergency_contact: "9876543249",
        special_conditions: "None",
      },
      {
        name: "Uma Thurman",
        phone_number: "9876543250",
        reg_no: "CS2023/021",
        emergency_contact: "9876543251",
        special_conditions: "None",
      },
      {
        name: "Victor Hugo",
        phone_number: "9876543252",
        reg_no: "CS2023/022",
        emergency_contact: "9876543253",
        special_conditions: "None",
      },
      {
        name: "Wanda Maximoff",
        phone_number: "9876543254",
        reg_no: "CS2023/023",
        emergency_contact: "9876543255",
        special_conditions: "None",
      },
      {
        name: "Xander Cage",
        phone_number: "9876543256",
        reg_no: "CS2023/024",
        emergency_contact: "9876543257",
        special_conditions: "None",
      },
      {
        name: "Yara Greyjoy",
        phone_number: "9876543258",
        reg_no: "CS2023/025",
        emergency_contact: "9876543259",
        special_conditions: "None",
      },
      {
        name: "Zara Khan",
        phone_number: "9876543260",
        reg_no: "CS2023/026",
        emergency_contact: "9876543261",
        special_conditions: "None",
      },
      {
        name: "Aaron Paul",
        phone_number: "9876543262",
        reg_no: "CS2023/027",
        emergency_contact: "9876543263",
        special_conditions: "None",
      },
      {
        name: "Bella Swan",
        phone_number: "9876543264",
        reg_no: "CS2023/028",
        emergency_contact: "9876543265",
        special_conditions: "None",
      },
      {
        name: "Chris Hemsworth",
        phone_number: "9876543266",
        reg_no: "CS2023/029",
        emergency_contact: "9876543267",
        special_conditions: "None",
      },
      {
        name: "Daisy Ridley",
        phone_number: "9876543268",
        reg_no: "CS2023/030",
        emergency_contact: "9876543269",
        special_conditions: "None",
      },
    ];
    await db.insert(StudentTable).values(
      students.map((student) => ({
        name: student.name,
        phone_number: student.phone_number,
        reg_no: student.reg_no,
        emergency_contact: student.emergency_contact,
        special_conditions: student.special_conditions,
      })),
    );

    // Seed Rooms
    const rooms = [
      { name: "Room 101", available_beds: 2, total_beds: 4 },
      { name: "Room 102", available_beds: 1, total_beds: 4 },
      { name: "Room 103", available_beds: 3, total_beds: 4 },
      { name: "Room 104", available_beds: 0, total_beds: 4 },
      { name: "Room 105", available_beds: 4, total_beds: 4 },
      { name: "Room 106", available_beds: 2, total_beds: 4 },
      { name: "Room 107", available_beds: 1, total_beds: 4 },
      { name: "Room 108", available_beds: 3, total_beds: 4 },
      { name: "Room 109", available_beds: 0, total_beds: 4 },
      { name: "Room 110", available_beds: 4, total_beds: 4 },
    ];
    await db.insert(RoomsTable).values(
      rooms.map((room) => ({
        name: room.name,
        available_beds: room.available_beds,
        total_beds: room.total_beds,
      })),
    );

    // Seed Drugs
    const drugs = [
      { name: "Paracetamol", quantity: 100 },
      { name: "Ibuprofen", quantity: 50 },
      { name: "Amoxicillin", quantity: 200 },
      { name: "Ciprofloxacin", quantity: 150 },
      { name: "Metformin", quantity: 300 },
      { name: "Aspirin", quantity: 400 },
      { name: "Omeprazole", quantity: 250 },
      { name: "Atorvastatin", quantity: 100 },
      { name: "Lisinopril", quantity: 50 },
      { name: "Levothyroxine", quantity: 200 },
    ];
    await db.insert(DrugsTable).values(
      drugs.map((drug) => ({
        name: drug.name,
        quantity: drug.quantity,
      })),
    );

    console.log("Database users and students successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
