import { SAFE_METHODS } from './utils.js';

export function crossOriginProtection(req, res, next) {
  if (SAFE_METHODS.includes(req.method)) {
    next();
    return;
  }

  if (req.headers['sec-fetch-site'] !== 'same-origin') {
    res.status(400).send('blocked');
    return;
  }

  next();
}
