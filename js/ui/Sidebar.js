/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const button = document.querySelector('.sidebar-toggle');
    button.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    });

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {    
    const loginButton = document.querySelector('.menu-item_login');
    loginButton.addEventListener('click', () => {
      const loginForm = App.getModal('login');
      loginForm.open();
    });

    const logoutButton = document.querySelector('.menu-item_logout');
    logoutButton.addEventListener('click', () => {
      User.logout(User.current(), () => {
        User.unsetCurrent();
        App.setState('init');
      });      
    });

    const registerButton = document.querySelector('.menu-item_register');
    registerButton.addEventListener('click', () => {
      const registerForm = App.getModal('register');
      registerForm.open();
    });

    // const document. 
    
  }

}
