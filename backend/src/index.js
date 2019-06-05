// let's go!
import dotenv from 'dotenv';
import createServer from './createServer';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import db from './db';

dotenv.config({ path: 'variables.env'});

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  const secret = process.env.APP_SECRET;
  if (token) {
    const { userId } = jwt.verify(token, secret);
    req.userId = userId;
  }
  next();
});

server.express.use(async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return next();
  }
  const user = await db.query.user({ where: { id: userId }}, '{id, name, email, permissions}');
  req.user = user;
  next();
})

server.start({
  cors: {
    credentials: true,
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000']
  },

},
deets => {
  console.log(`Running on port ${deets.port}`)
}
);

