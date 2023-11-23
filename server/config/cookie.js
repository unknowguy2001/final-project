const cookieConfig = {
  signed: true, // ensure that the cookie is tamper-proof
  httpOnly: true, // client-side JavaScript will not be able to access the cookie
};

module.exports = cookieConfig;
