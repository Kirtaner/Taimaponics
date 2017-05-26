import { TaimaponicsAngularPage } from './app.po';

describe('taimaponics-angular App', () => {
  let page: TaimaponicsAngularPage;

  beforeEach(() => {
    page = new TaimaponicsAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
