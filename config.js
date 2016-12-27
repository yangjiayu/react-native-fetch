const config = {
    url: 'www.google.com',
    log: __DEV__ ? console : {
      info(){},
      warn(){}
    },
    time: 15000,
    password: '123456',
    userName: 'Libai'
  };

export default config;