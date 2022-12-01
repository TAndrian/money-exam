import { CheckIfUserExistsMiddleware } from './check-if-user-exists.middleware';

describe('CheckIfUserExistsMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckIfUserExistsMiddleware()).toBeDefined();
  });
});
