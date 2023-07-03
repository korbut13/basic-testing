// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/relative';
  const responseData = 'hello';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: responseData });
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    jest.advanceTimersByTime(5000);
    await throttledGetDataFromApi(relativePath);
    expect(axios.Axios.prototype.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest.advanceTimersByTime(10000);
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toBe(responseData);
  });
});
