/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {

    User.register(options, (error, response) => {

      if (error) {
        console.error(error);
        return;
      }

      if (response.error) {
        console.error(response.error);
        return;
      }      

      App.getModal('register').close();

      User.setCurrent(options);

      App.setState('user-logged');      
    });
    
    

  }
}
