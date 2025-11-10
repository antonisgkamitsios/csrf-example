export function parseCookieHeader(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return {};

  const cookies = {};

  const cookieNameValuePairs = cookieHeader.split(';');
  cookieNameValuePairs.forEach((nameValuePair) => {
    const [name, value] = nameValuePair.split('=');
    cookies[name.trim()] = value.trim();
  });

  return cookies;
}
