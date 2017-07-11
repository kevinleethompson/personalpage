import { TestingAppPage } from './app.po';

describe('testing-app App', () => {
  let page: TestingAppPage;

  beforeEach(() => {
    page = new TestingAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
