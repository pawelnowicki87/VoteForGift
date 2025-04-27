import { User } from '../models/user.js';
import { v4 as uuid4 } from 'uuid';
import { sendActivationMail } from '../sevices/mail-service.js';
import jwt from 'jsonwebtoken';

const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const activationToken = uuid4();

    const user = await User.create({ firstName, lastName, email, password, activationToken });
    await sendActivationMail(email, activationToken)

    res.send({ 
      email: user.email})
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, activationToken: null }});

  if(!user) {
      return res.status(404).json({ message: 'Nieprawidłowy email lub hasło'});
  }

  if (password !== user.password) {
    return res.status(401).json({ message: 'Nieprawidłowe hasło' });
  }

  const accessToken = jwt.sign({ 
      email: user.email, 
      firstName: user.firstName, 
      lastName: user.lastName 
  }, process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: '15m'}
  );

  const refreshToken = jwt.sign({
      id: user.id},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '30d'}
  )

  res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000,
  })

  res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  res.json({
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
  });
}

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Brak refreshTokena' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.error('Błąd refreshTokena:', err);
        return res.status(403).json({ message: 'Nieprawidłowy refreshToken' });
      }

      const user = await User.findByPk(decoded.id); // <-- SZUKAMY USERA

      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie istnieje' });
      }

      const accessToken = jwt.sign(
        { email: user.email, firstName: user.firstName, lastName: user.lastName },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 15 * 60 * 1000
      });

      res.json({
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }

      });
    });
  } catch (error) {
    console.error('Błąd odświeżania tokena:', error);
    res.status(500).json({ message: 'Błąd serwera przy odświeżeniu' });
  }
};




const activate = async (req, res, next) => {
    const { activationToken } = req.params;

    const user = await User.findOne({
        where: { activationToken},
    })

    if (!user) {
        res.sendStatus(404);
        return;
    }

    user.activationToken = null;

    await user.save();

    res.send(user);
}




export const authController = {
    register,
    activate,
    login,
    refresh
}