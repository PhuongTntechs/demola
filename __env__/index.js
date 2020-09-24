const fs = require('fs');
const pt = require('path');

const myArgs = process.argv.slice(2);
const env = myArgs[0];
const ROOT_PATH = pt.dirname(__dirname);
console.log('setting up environment for: ' + env);

const list = [
  {
    from: 'env.js',
    to: 'app/config/env.js',
    title: 'App configs',
  },
  //add your google-services.json to dev folder and un-comment this
  {
    from: 'google-services.json',
    to: 'android/app/google-services.json',
    title: 'Firebase config for Android',
  },
  //add your GoogleService-Info.plist to dev folder and un-comment this
  {
    from: 'GoogleService-Info.plist',
    to: 'ios/GoogleService-Info.plist',
    title: 'Firebase config for Ios',
  },
  //Fix lib react native
  {
    from: 'RCTNetworkTask.mm',
    to: 'node_modules/react-native/Libraries/Network/RCTNetworkTask.mm',
    title: 'Fix lib react native',
  },
];

list.forEach((item) => {
  fs.copyFile(
    ROOT_PATH + '/__env__/' + env + '/' + item.from,
    ROOT_PATH + '/' + item.to,
    (err) => {
      if (!err) {
        console.log('Copied: ' + item.title);
      }
    },
  );
});
