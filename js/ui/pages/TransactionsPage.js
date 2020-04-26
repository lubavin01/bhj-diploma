/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {

    if (!element) {
      throw error('argument not defined');
    }

    this.element = element;

    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {

    this.render();

  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {

    const btn = this.element.querySelector('.remove-account');

    btn.addEventListener('click', (e) => {
      this.removeAccount();
    });

    const content = this.element.querySelector('.content');
    content.addEventListener('click', (e) => {
      if (!e.target.matches('button.transaction__remove')) { return };

      const transactionId = e.target.dataset.id;
      this.removeTransaction(transactionId);
    });

    // const btnRemoveTrans = this.element.querySelector('.transaction__remove');
    // btnRemoveTrans.addEventListener('click', () => {
    //   Transaction.remove()
    // });

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.accountid) {
      return;
    }

    if (!confirm('remove account?')) {
      return;
    }


    Account.remove(this.accountid, {}, (error, response) => {
      if (!response.success) {
        return;
      }

      this.clear();

      App.update();
    });
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {

    if (!confirm('Remove transaction?')) { return };

    Transaction.remove(id, {}, (error, response) => {
      if (!response.success) {
        console.error('Error');
        return;        
      }

      App.update();
    });

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {

    if (options) {

      this.accountid = options.accountid;

      Account.get(this.accountid, {}, (error, response) => {
        this.renderTitle(response.data.name);
      });

      Transaction.list({ account_id: this.accountid }, (error, response) => {

        if (error) {
          console.error(error);
        };

        if (!response.success) {
          console.error('error');
        };

        this.renderTransactions(response.data);
      });

    }

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {

    this.renderTransactions('');
    this.renderTitle('Название счета');

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    const title = this.element.querySelector('.content-title');
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {

    const months = {
      0: 'января',
      1: 'февраля',
      2: 'марта',
      3: 'апреля',
      4: 'мая',
      5: 'июня',
      6: 'июля',
      7: 'августа',
      8: 'сентября',
      9: 'октября',
      10: 'ноября',
      11: 'декабря',
    }

    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    let hour = dateObj.getHours();
    if (hour.length === 1) {
      hour = '0' + hour;
    }
    let minute = dateObj.getMinutes();
    if (minute.length === 1) {
      minute = '0' + minute;
    }
    return `${day} ${month} ${year} г. в ${hour}:${minute}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {

    return (`<div class="transaction transaction_${item.type} row">
              <div class="col-md-7 transaction__details">
                <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
                </div>
                <div class="transaction__info">
                  <h4 class="transaction__title">${item.name}</h4>
                  <!-- дата -->
                  <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="transaction__summ">
                  <!--  сумма -->
                  ${item.sum}<span class="currency">₽</span>
                </div>
              </div>
              <div class="col-md-2 transaction__controls">
                <!-- в data-id нужно поместить id -->
                <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>`);
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {

    let HTMLtransactions = '';
    const content = this.element.querySelector('.content');

    if (Array.isArray(data)) {
      data.forEach(item => { HTMLtransactions += this.getTransactionHTML(item) });
    }    

    content.innerHTML = HTMLtransactions;
  }
}
