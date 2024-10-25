import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

type HashedPassword = {
  hashedPassword: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HashedPassword>
) {
  const { password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  res.status(200).json({ hashedPassword });
}
