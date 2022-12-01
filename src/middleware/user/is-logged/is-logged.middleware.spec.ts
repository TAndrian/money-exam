import { IsLoggedMiddleware } from './is-logged.middleware';

describe('IsLoggedMiddleware', () => {
  it('should be defined', () => {
    expect(new IsLoggedMiddleware()).toBeDefined();
  });
});
