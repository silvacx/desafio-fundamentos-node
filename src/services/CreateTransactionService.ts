import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const transactionType = type;
    const { total } = this.transactionsRepository.getBalance();

    // if(!["income", "outcom"].includes(type))
    if (transactionType !== 'income' && transactionType !== 'outcome') {
      throw Error('You do not have enout balance');
    }

    if (type === 'outcome' && total < value) {
      throw Error('Error creating this transaction');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
