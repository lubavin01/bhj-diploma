/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  static HOST = 'https://bhj-diplom.letsdocode.ru';
  static URL = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = f => f) {

    createRequest({ method: 'GET', url: this.HOST + this.URL, data: data, callback: callback, responseType: 'json' });

  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = f => f) {

    const newData = {...data, method: 'PUT' } ;
    createRequest({ method: 'POST', url: this.HOST + this.URL, data: newData, callback: callback, responseType: 'json' });    

  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = '', data, callback = f => f) {

    const newData = {...data, id } ;
    createRequest({ method: 'GET', url: this.HOST + this.URL, data: newData, callback: callback, responseType: 'json' });    

  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '', data, callback = f => f) {
    const newData = {...data, id, _method: 'DELETE' } ;
    createRequest({ method: 'POST', url: this.HOST + this.URL, data: newData, callback: callback, responseType: 'json' });    

  }
}

const data = {
  name: 'new user',
  email: '1@1.ru',
  password: '1234'
};


//Еntity.list(data, null);
//Entity.create(data);

