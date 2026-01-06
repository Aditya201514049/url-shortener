import { createUser, validateUser } from "../services/auth.service.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await createUser(email, password);

    const token = generateToken(user.id);
    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);

    const token = generateToken(user.id);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
