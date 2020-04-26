/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {

    if (!element) {
      throw error('argument not defined');
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {

    const incomeBtn = this.element.querySelector('.create-income-button');    
    incomeBtn.addEventListener('click', (e) => {
      const modal = App.getModal('newIncome');
      modal.open();
    });

    const expenseBtn = this.element.querySelector('.create-expense-button');    
    expenseBtn.addEventListener('click', (e) => {
      const modal = App.getModal('newExpense');
      modal.open();
    });

  }
}
