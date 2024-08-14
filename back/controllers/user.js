import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res
        .status(400)
        .json({ msg: "Invalid Content-Type. Expected 'application/json'." });

    if (!req.user || req.user.skill !== "GOD")
      return res.status(403).json({ msg: "Not authorized to make this request." });

    let user = await prisma.user.findUnique({
      where: { email: String(req.body.email) },
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
        .json({ msg: `Email '${req.body.email} already in use.'` });

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
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res
        .status(400)
        .json({ msg: "Invalid Content-Type. Expected 'application/json'." });

    if (!req.user || !(req.user.id === req.params.id || req.user.skill === "GOD"))
      return res.status(403).json({ msg: "Not authorized to make this request." });

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

    user = await prisma.user.update({
      where: { id: String(req.params.id) },
      data: { ...req.body },
    });
    delete user.password;

    return res.status(200).json({
      msg: `User '${user.name}' successfully updated!`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.user || !(req.user.id === req.params.id || req.user.skill === "GOD"))
      return res.status(403).json({ msg: "Not authorized to make this request." });

    const user = await prisma.user.findUnique({
      where: { id: String(req.params.id) },
    });

    if (!user) return res.status(404).json({ msg: "No user found." });

    await prisma.user.delete({
      where: { id: String(req.params.id) },
    });

    return res.status(200).json({ msg: `User '${user.name}' successfully deleted!` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
