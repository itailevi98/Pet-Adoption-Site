const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: 'Must provide an authorization header' });
    return;
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, "gUkXp2s5v8y/A?D(G+KbPeShVmYq3t6w", async (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Invalid token' });
      return;
    }
    req.user = decoded; // { id: ... }
    next();
  });
}
exports.auth = auth;