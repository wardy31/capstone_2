const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const hash = require("bcrypt");

const userSeeder = async () => {
  try {
    const result = await prisma.user.createMany({
      data: [
        // Admin Start
        {
          firstName: "Admin",
          lastName: "Admin",
          gender: "male",
          role: "clinic",
          department: "admin",
          address: "admin",
          vaccineStatus: "fully vacinated",
          contactNumber: "12345678901",
          email: "admin@gmail.com",
          username: "admin",
          password: await hash.hash("password", 10),
          isClinicStaff: true,
          imagesPath: "/admin",
        },
        // ADmin ENd
        // {
        //   firstName: "John",
        //   lastName: "Doe",
        //   gender: "male",
        //   role: "student",
        //   department: "BSIT",
        //   address: "Tacloban City Naga Naga",
        //   vaccineStatus: "fully vacinated",
        //   contactNumber: "12345678901",
        //   email: "warded@gmail.com",
        //   username: "user1",
        //   password: await hash.hash("password", 10),
        //   imagesPath: "/ed",
        // },
        // {
        //   firstName: "Eduardo",
        //   middleName: "Talon",
        //   lastName: "Macabacyao",
        //   gender: "male",
        //   role: "student",
        //   department: "BSIT",
        //   address: "Tacloban City Naga Naga",
        //   vaccineStatus: "fully vacinated",
        //   contactNumber: "12345678901",
        //   email: "warded@gmail.com",
        //   username: "user1",
        //   password: await hash.hash("password", 10),
        //   isClinicStaff: false,
        //   imagesPath: "/ed",
        // },
        // {
        //   firstName: "Roy",
        //   lastName: "Badajos",
        //   gender: "male",
        //   role: "student",
        //   department: "BSIT",
        //   address: "Tacloban City Babatngon",
        //   vaccineStatus: "fully vacinated",
        //   contactNumber: "12345678901",
        //   email: "roy@gmail.com",
        //   username: "user2",
        //   password: await hash.hash("password", 10),
        //   isClinicStaff: false,
        //   imagesPath: "/ed",
        // },
        // {
        //   firstName: "Raineil",
        //   lastName: "Saclay",
        //   gender: "male",
        //   role: "student",
        //   department: "BSIT",
        //   address: "Tanuan Leyte",
        //   vaccineStatus: "fully vacinated",
        //   contactNumber: "12345678901",
        //   email: "saclay@gmail.com",
        //   username: "user3",
        //   password: await hash.hash("password", 10),
        //   isClinicStaff: false,
        //   imagesPath: "/ed",
        // },
        // {
        //   firstName: "Rhea Mae",
        //   lastName: "Bagro",
        //   gender: "male",
        //   role: "student",
        //   department: "BSIT",
        //   address: "Utap Tacloban City",
        //   vaccineStatus: "fully vacinated",
        //   contactNumber: "12345678901",
        //   email: "rhea@gmail.com",
        //   username: "user4",
        //   password: await hash.hash("password", 10),
        //   isClinicStaff: false,
        //   imagesPath: "/ed",
        // },
      ],
    });
  } catch (error) {
    console.log(error);
  }

  console.log("Success");
};

module.exports = userSeeder;
