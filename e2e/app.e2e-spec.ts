import { ItalianHappinessPage } from './app.po';

describe('italian-happiness App', function() {
  let page: ItalianHappinessPage;

  beforeEach(() => {
    page = new ItalianHappinessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
