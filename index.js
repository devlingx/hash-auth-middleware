const axios = require('axios');

module.exports = URI => async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      res.cookie('token', token);
      const tokenResponse = await axios.get(URI + token);
      if (tokenResponse) {
        return next();
      }
    } catch {
    }
  }
  return res.send(`<script>
    const token = window.prompt('Enter access code');
    if(token) {
      document.cookie = 'token=' + token;
      document.location = document.location;
    }
</script>`);
};