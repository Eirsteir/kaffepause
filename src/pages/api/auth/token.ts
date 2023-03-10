import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

// const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req })
  console.log("in token.ts: ", token);
  res.json({ token })
}
