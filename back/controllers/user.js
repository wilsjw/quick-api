import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res
        .status(400)
        .json({ msg: "Invalid Content-Type. Expected 'application/json'." });

    let user = await prisma.user.findUnique({
      where: {
        OR: [{ name: { equals: String(req.body.name) } }],
      },
      select: {
        id: true,
        name: true,
        email: true,
        skill: true,
      },
    });

    if (user)
      return res
        .status(404)
        .json({ msg: `User '${req.body.name} already exists.'` });

    user = await prisma.user.create({
      data: { ...req.body },
    });
    delete user.password;

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (users.length === 0)
      return res.status(404).json({ msg: "No users found." });

    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: String(req.params.id) },
      select: {
        id: true,
        name: true,
        email: true,
        skill: true,
      },
    });

    if (!user) return res.status(404).json({ msg: "No user found." });

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await prisma.user.findUnique({
      where: { id: String(req.params.id) },
      select: {
        id: true,
        name: true,
        email: true,
        skill: true,
      },
    });

    if (!user) return res.status(404).json({ msg: "No user found." });

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { createUser, getUsers, getUser };
