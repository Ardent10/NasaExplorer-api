import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router: Router = Router();

// REGISTRATION
router.post("/register", async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,

      username,
      email,

      location,
      dob,
      password,
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !location ||
      !dob
    ) {
      return res.status(400).json("Missing Credentials!");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        location,
        dob,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
    }
  } catch (err: any) {
    res.status(500).json(err);
    console.log(err);
  }
});

// LOGIN
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("Wrong Credentials!");
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json("Wrong Credentials!");
    }

    const accessToken: string = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC_KEY!,
      { expiresIn: "3d" }
    );

    const { password: userPassword, ...others } = user;

    res.status(200).json({ ...others, accessToken });
  } catch (err: any) {
    res.status(500).json(err);
    console.log(err);
  }
});

export default router;
