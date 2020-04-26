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
      const account = e.target.closest('.account');

      if (!account) return;

      this.onSelectAccount(account);
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
      const { id, name, email } = currentUser;
      const currentUserData = { id, name, email };

      Account.list(currentUserData, (error, response) => {

        this.clear();
        
        if (response.success) {
          response.data.forEach((i) => {

            this.renderItem(i);

          } );
        }
      } );
    }

  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {

    [...this.element.querySelectorAll('.account')].forEach( i => i.remove() );

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

    element.classList.add('active');
    
    App.showPage('transactions', { accountid: element.dataset.accountid });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {

    return (`<li class="account" data-accountid=${item.id}>
              <a href="#">
                <span>${item.name}</span> /
                <span>${item.sum} ₽</span>
              </a>
            </li>
            `);
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item) {

    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));

  }
}
