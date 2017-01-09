import { AsfrontPage } from './app.po';

describe('asfront App', function() {
  let page: AsfrontPage;

  beforeEach(() => {
    page = new AsfrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
