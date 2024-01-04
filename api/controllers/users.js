const prisma = require('../db');
const bcrypt = require('bcrypt');

const { createToken } = require('../middleware/auth');
const { catchAsyncErrors } = require('../utils');
const { STATUSES } = require('../constants');

/**
 * Fetches the user from the database by the userId from the JWT.
 * Also sends their info to the client.
 * @returns { function }
 */
const getUser = catchAsyncErrors(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  res.status(STATUSES.OK).json(user);
});

/**
 * Adds a new user to the database.
 * @returns { function }
 */
const addUser = catchAsyncErrors(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const salt = bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword
    }
  });

  const token = createToken(user.id);
  res.status(STATUSES.CREATED).json({ token });
});

module.exports = { addUser, getUser };
