interface Transaction {
  amount: number;
  currency: string;
  cardNumber: string;
  timestamp: string;
}

interface TransactionResult {
  success: boolean;
  transactionId: string;
  status: 'PENDING_SYNC' | 'SYNCED' | 'FAILED';
}

export function processOfflineTransaction(transaction: Transaction): TransactionResult {
  if (transaction.amount <= 0) {
    throw new Error('Invalid transaction amount');
  }

  return {
    success: true,
    transactionId: generateTransactionId(),
    status: 'PENDING_SYNC'
  };
}

export async function syncOfflineTransactions(transactions: Transaction[]): Promise<{
  synced: boolean;
  failedTransactions: Transaction[];
}> {
  // Simulate network sync
  return {
    synced: true,
    failedTransactions: []
  };
}

function generateTransactionId(): string {
  return Math.random().toString(36).substring(2, 15);
}