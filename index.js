/**
 * app entry poit
 */
const app = require('./src/app');

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
