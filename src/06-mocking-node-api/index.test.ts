// Uncomment the code below and write your tests
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import fs from 'fs';
import fsPromise from 'fs/promises';
import path from 'path';

jest.mock('fs/promises');

const testCallback = jest.fn();
const timeout = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(testCallback, timeout);
    expect(setTimeout).toHaveBeenCalledWith(testCallback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(testCallback, timeout);
    expect(testCallback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(testCallback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(testCallback, timeout);
    expect(setInterval).toHaveBeenCalledWith(testCallback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.advanceTimersByTime(timeout);
    expect(testCallback).toBeCalledTimes(1);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const pathToFile = 'file.txt';
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'file.txt';

    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Hello world!';
    const pathToFile = 'file.txt';

    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockReturnValue(true);

    (fsPromise.readFile as jest.Mock).mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});
