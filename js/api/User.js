/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static HOST = Entity.HOST;
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
    return createRequest(
      {
        method: 'GET',
        data,
        callback,
        url: this.HOST + this.URL + '/current',
      });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    return createRequest(
      {
        method: 'POST',
        data,
        callback,
        url: this.HOST + this.URL + '/login',
      });

  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = f => f) {
    return createRequest(
      {
        method: 'POST',
        data,
        callback,
        url: this.HOST + this.URL + '/register',
      });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f => f) {
    return createRequest(
      {
        method: 'POST',
        data,
        callback,
        url: this.HOST + this.URL + '/logout',
      });
  }
}

const newData = {
  name: 'Nikola',
  email: 'testo_test001@test123.ru',
  password: 'abracadabra'
}

const testF = (e, response) => {
  console.log('response', response);

  if (response.error) {
    console.log('error', response.error);
  }
  else if (response.success) {
    console.log('success');
    if (response.user) {
      User.setCurrent(response.user);
    }
  }

  console.log('current', User.current());
}

User.login(newData, testF);

User.logout(newData, testF)

// User.register(newData, (e, response) => {
//   console.log('response', response);

//   if (response.error) {
//     console.log('error', response.error);
//   }
//   else if (response.success) {
//     console.log('success');
//     User.setCurrent(newData);
//   }
// })

console.log(User.current());


// User.setCurrent( user );

// User.fetch(User.current(), ( err, response ) => {
//   console.log('response', response);
//   console.log('err', err);  
//   console.log( response.user.id ); // 2
// });

