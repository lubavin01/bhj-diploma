/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {

    if (!element) {
      throw error('argument not defined');
    }

    this.element = element;

    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const button = this.element.querySelector('.create-account');
    button.addEventListener('click', (e) => {
      const modal = App.getModal('createAccount');
      modal.open();
    });

    this.element.addEventListener('click', (e) => {
      if (!e.target.matches('.account')) {return};

      AccountsWidget.onSelectAccount(e.target);
    });    
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {

    const currentUser = User.current();
    if (currentUser) {
      const {id, name, email} = currentUser;
      const currentUserData = {id, name, email};
      Account.list(currentUser, (error, response) => {

        //const sideBar = this.element.query
        let accountsHTML = '';
        if (response.success) {
          response.data.forEach((i) => {
            accountsHTML +=
              `<li class="account" data-accountid=${i.id}>
                <a href="#">
                  <span>${i.name}</span> /
                  <span>${i.sum} ₽</span>
                </a>
              </li>`;

          });

          this.element.insertAdjacentHTML('beforeend', accountsHTML);
        }

      });
    }

  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {

  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const accounts = this.element.querySelectorAll('.account');
    [...accounts].forEach((i) => { i.classList.remove('active') });

    this.element.classList.add('active');
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {

  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item) {

  }
}
