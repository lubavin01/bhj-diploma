/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);

    this.renderAccountsList();

  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {

    Account.list( User.current(), (error, response) => {
      
      if (response.success) {
        console.log(response.data);

        const select = this.element.querySelector('.accounts-select');
        const innerHTML = response.data.reduce((acc,i)=>{
          return acc+`<option value="${i.id}">${i.name}</option>`
        }, '' );

        select.innerHTML = innerHTML;
      }

    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {

  }
}
