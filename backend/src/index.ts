import app from './app'
import config from './config'


try{
  app.listen(config.port, () => {
    console.log(`Server is running on port: ${config.port}`);
  });
}catch(e) {
  console.log(`Cannot run the server: ${e}`);
}
  