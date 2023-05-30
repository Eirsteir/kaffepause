import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = await getToken({ req, raw: true });

  res.json({ token });
}
