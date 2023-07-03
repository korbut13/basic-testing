// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = await resolveValue('hello');
    expect(value).toBe('hello');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'The operation failed';
    function getErrorMessage() {
      throwError(message);
    }
    expect(getErrorMessage).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    function getErrorMessage() {
      throwError();
    }
    expect(getErrorMessage).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const err = new MyAwesomeError();
    function getErrorMessage() {
      throwCustomError();
    }
    expect(getErrorMessage).toThrow(err);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const err = new MyAwesomeError();

    await rejectCustomError().catch((error) => expect(error).toEqual(err));
  });
});
