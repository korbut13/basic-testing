// Uncomment the code below and write your tests
import { BankAccount, getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from './index';
import _ from 'lodash';
jest.mock('lodash');

describe('BankAccount', () => {
  let testBancAccaunt: BankAccount;
  let initBalance = 1000;
  const largeAmountToWithdraw = 5000;
  const suitableAmountToWithDraw = 500;
  const amountForDeposit = 50;

  beforeEach(() => {
    testBancAccaunt = new BankAccount(initBalance);
  });

  test('should create account with initial balance', () => {
    expect(getBankAccount(initBalance)).toEqual(testBancAccaunt);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawErr = new InsufficientFundsError(initBalance);

    function getError() {
      testBancAccaunt.withdraw(largeAmountToWithdraw);
    };

    expect(getError).toThrow(withdrawErr);
  });

  test('should throw error when transferring more than balance', () => {
    const withdrawErr = new InsufficientFundsError(initBalance);
    const otherBancAccount = new BankAccount(initBalance);

    function getError() {
      testBancAccaunt.transfer(largeAmountToWithdraw, otherBancAccount);
    };

    expect(getError).toThrow(withdrawErr);
  });

  test('should throw error when transferring to the same account', () => {
    const transferErr = new TransferFailedError();
    function getError() {
      testBancAccaunt.transfer(50, testBancAccaunt);
    };

    expect(getError).toThrow(transferErr);
  });

  test('should deposit money', () => {
    expect(getBankAccount(initBalance).deposit(amountForDeposit).getBalance()).toBe(initBalance + amountForDeposit)
  });

  test('should withdraw money', () => {
    expect(testBancAccaunt.withdraw(suitableAmountToWithDraw).getBalance()).toBe(initBalance - suitableAmountToWithDraw);
  });

  test('should transfer money', () => {
    const otherBancAccount = new BankAccount(initBalance);
    testBancAccaunt.transfer(suitableAmountToWithDraw, otherBancAccount);
    expect(otherBancAccount.getBalance()).toBe(initBalance + suitableAmountToWithDraw)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (_.random as jest.Mock).mockImplementation(() => {
      return initBalance === 1000 ? 1 : 0;
    });

    const myBalance = await testBancAccaunt.fetchBalance();
    expect(myBalance).toBe(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (_.random as jest.Mock).mockImplementation(() => {
      return initBalance === 1000 ? 1 : 0;
    });

    await testBancAccaunt.synchronizeBalance();
    expect(testBancAccaunt.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    initBalance = 500;
    const synchronizationErr = new SynchronizationFailedError();

    (_.random as jest.Mock).mockImplementation(() => {
      return initBalance === 1000 ? 1 : 0;
    });

    await testBancAccaunt.synchronizeBalance().catch((err) => expect(err).toEqual(synchronizationErr));
  });
});
