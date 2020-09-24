const AppEnv = {
  ENV_NAME: 'dev',
  API_ENDPOINT: 'http://10.0.0.8:8082/TOSS/api/', //10.0.2.2
  API_CBC: 'http://appmobile.tng.vn:8082/production/api/',
  FIREBASE_CONFIGS: {
    apiKey: 'AIzaSyDKziNE8wHvvjO0qRrFLi7yWG5-cJz04Nw',
    authDomain: 'https://tngoffice-dev.firebaseapp.com',
    projectId: 'tngoffice-dev',
  },
  UPDATE_CONFIGS: {
    FILE_URL:
      'https://raw.githubusercontent.com/harrybui2804/tngapp/master/office/tngoffice.json',
    PROVIDER: 'vn.tng.tngoffice.dev.provider',
  },
};

export default AppEnv;
