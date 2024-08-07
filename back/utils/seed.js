import { PrismaClient } from "@prisma/client";

const main = async () => {
  try {
    const prisma = new PrismaClient();

    const users = [
      {
        "name": "ashures",
        "email": "ashures@gmail.com",
        "password": "testPass",
        "skill": "GOD",
      },
      {
        "name": "test",
        "email": "test@gmail.com",
        "password": "hiThere",
        "skill": "NOVICE",
      },
    ];

    for (let user of users) {
      await prisma.user.upsert({
        "where": { "email": user.email },
        "update": user,
        "create": user,
      });
    }

    console.log("Successfully seeded database!");
  } catch (error) {
    console.error(error.message);
  }    
};

main();
