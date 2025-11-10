import { parseCookieHeader } from './utils.js';
import crypto from 'node:crypto';

const cookieName = 'csrf_token';
const tokenLen = 32;

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

function generateRandomBytes() {
  return crypto.randomBytes(tokenLen);
}

function tokenEncode(token) {
  return token.toString('base64');
}

function tokenDecode(token) {
  return Buffer.from(token, 'base64');
}

function oneTimePad(data, key) {
  for (let i = 0; i < data.length; i++) {
    data[i] ^= key[i];
  }
}

function maskToken(data) {
  const key = generateRandomBytes();
  const token = Buffer.copyBytesFrom(data);
  oneTimePad(token, key);

  return Buffer.concat([token, key]);
}

function unMaskToken(data) {
  const token = Buffer.copyBytesFrom(data, 0, tokenLen);
  const key = Buffer.copyBytesFrom(data, tokenLen, data.length);

  oneTimePad(token, key);

  return token;
}

export function csrf(req, res, next) {
  const cookies = parseCookieHeader(req);
  const csrfCookie = cookies[cookieName];

  let cookieToken;
  if (csrfCookie) {
    cookieToken = tokenDecode(csrfCookie);
  }

  // We didn't find cookie or the token has been tampered with, we create one
  console.log(cookieToken.length);

  if (cookieToken?.length !== tokenLen) {
    const token = generateRandomBytes();
    req.csrf_token = tokenEncode(maskToken(token));
    res.cookie(cookieName, tokenEncode(token), { secure: true, httpOnly: true, sameSite: 'lax' });
  } else {
    req.csrf_token = tokenEncode(maskToken(cookieToken));
  }

  // On safe methods we don't want to do anything
  if (SAFE_METHODS.includes(req.method)) {
    next();
    return;
  }

  // extract csrf_token from body, we could extract if from header etc
  const sentToken = req.body.csrf_token || '';

  // tokens dont match
  const decodedToken = tokenDecode(sentToken);
  if (unMaskToken(decodedToken).toString('base64') !== cookieToken.toString('base64')) {
    res.status(400).send('Invalid csrf_token');
    return;
  }

  next();
}
