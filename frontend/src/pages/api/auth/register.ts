import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // バリデーション
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'すべてのフィールドを入力してください' });
    }

    // メールアドレスの重複チェック
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'このメールアドレスは既に使用されています' });
    }

    // パスワードのハッシュ化
    const hashedPassword = await hash(password, 12);

    // ユーザー作成
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // パスワードを返さないようにする
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      user: userWithoutPassword,
      message: 'アカウントが作成されました',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: '内部サーバーエラーが発生しました' });
  }
}
