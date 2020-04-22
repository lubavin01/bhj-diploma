/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {

    User.login(options, (error, response) => {

      if (error) {
        console.error(error);
        return;
      }

      if (response.error) {
        console.error(response.error);
        return;
      }  
           
      App.getModal('login').close();

      User.setCurrent(options);

      App.setState('user-logged');
    });
  }
}
