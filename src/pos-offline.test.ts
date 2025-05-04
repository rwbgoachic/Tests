import { describe, it, expect } from 'vitest';
import { processOfflineTransaction } from './pos';

describe('POS Offline Processing', () => {
  it('should process offline transactions', () => {
    const transaction = {
      amount: 1000,
      currency: 'USD',
      cardNumber: '4111111111111111',
      timestamp: new Date().toISOString()
    };

    const result = processOfflineTransaction(transaction);
    
    expect(result).toEqual({
      success: true,
      transactionId: expect.any(String),
      status: 'PENDING_SYNC'
    });
  });

  it('should validate transaction data', () => {
    const invalidTransaction = {
      amount: -100,
      currency: 'USD',
      cardNumber: '4111111111111111'
    };

    expect(() => processOfflineTransaction(invalidTransaction))
      .toThrow('Invalid transaction amount');
  });

  it('should handle network restoration', async () => {
    const offlineTransactions = [
      {
        amount: 1000,
        currency: 'USD',
        cardNumber: '4111111111111111',
        timestamp: new Date().toISOString()
      }
    ];

    const syncResult = await syncOfflineTransactions(offlineTransactions);
    expect(syncResult.synced).toBe(true);
    expect(syncResult.failedTransactions).toHaveLength(0);
  });
});