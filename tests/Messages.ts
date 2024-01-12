import { Locator, Page } from '@playwright/test';
export class MessagesPage {
  readonly page: Page;
  readonly getPic: Locator;
  readonly writeMessage: Locator;
readonly messageText: Locator;
readonly heartEmoj: Locator;
readonly errorPopUp: Locator;
readonly search: Locator;
readonly sendMessage: Locator;
readonly cakeBtn: Locator;
readonly checkBtn: Locator;
readonly declineMsg: Locator;
readonly startConv: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPic = page.getByLabel('Сообщения');
    this.writeMessage = page.getByRole('button', {
      name: 'Создание нового сообщения Новое сообщение'
    });
    this.messageText = page.getByPlaceholder('Введите сообщение')
    this.heartEmoj = page.getByLabel('Добавить значок сердечка в беседу')
    this.errorPopUp = page.getByText('Ошибка. Выберите действительного пользователя')
    this.search = page.getByPlaceholder('Поиск по имени или эл. адресу')
    this.sendMessage = page.getByLabel('Отправить сообщение в беседу')
    this.cakeBtn = page.getByRole('button', { name: 'C K C K cake' })
    this.checkBtn =page.getByLabel('выбранный флажок')
    this.startConv = page.locator('.tBJ.dyH.iFc.dR0.EdS.zDA.IZT.swG');
    this.declineMsg = page.getByLabel('Вернуться ко входящим сообщениям')
}}