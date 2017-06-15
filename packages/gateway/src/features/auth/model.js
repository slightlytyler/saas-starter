import Model from 'core/Model';

const tmpUserObject = {
  id: 'user:1',
  email: 'user1@gmail.com',
  username: 'user1',
};

class AuthModel extends Model {
  constructor(...args) {
    super(...args);
    this.constructor.removeDefaultMethods();
  }

  static modelName = 'auth';

  static schema = {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
      required: true,
    },
    username: {
      type: 'string',
      required: true,
    },
  };

  findSelf() {
    return Promise.resolve(tmpUserObject);
  }

  signIn() {
    return Promise.resolve(tmpUserObject);
  }

  signUp() {
    return Promise.resolve(tmpUserObject);
  }

  signOut() {
    return Promise.resolve(true);
  }
}
