import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res
        .status(400)
        .json({ msg: "Invalid Content-Type. Expected 'application/json'." });

    let user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (user)
      return res
        .status(404)
        .json({ msg: `Email '${req.body.email} already in use.'` });

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    user = await prisma.user.create({
      data: { ...req.body, password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
        skill: true,
      },
    });

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json")
      return res
        .status(400)
        .json({ msg: "Invalid Content-Type. Expected 'application/json'." });

    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user)
      return res.status(401).json({ msg: "Incorrect email or password." });

    const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ msg: "Incorrect email or password." });
    
    delete user.password;

    const { JWT_SECRET, JWT_LIFETIME } = process.env;

    const token = jwt.sign({
      id: user.id,
      skill: user.skill,
    }, JWT_SECRET, { expiresIn: JWT_LIFETIME });

    user.token = token;

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { register, login };
