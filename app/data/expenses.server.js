import { prisma } from '../data/database.server.js';

export const addExpense = async (expenseData) => {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.error('Error adding expense:', error.message);
    throw new Error('Failed to add expense: ' + error.message);
  }
};

export const getExpenses = async () => {
  try {
    const expenses = await prisma.expense
      .findMany({
        orderBy: {
          date: 'desc',
        },
      })
      .then((expenses) => {
        return expenses;
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error.message);
        throw new Error('Failed to fetch expenses: ' + error.message);
      });

    return expenses;
  } catch (error) {
    console.error('Error fetching expenses:', error.message);
    throw new Error('Failed to fetch expenses: ' + error.message);
  }
};

export const getExpensesById = async (id) => {
  try {
    console.log('Fetching expense with ID:', id);
    return await prisma.expense.findFirst({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error('Error fetching expense by ID:', error.message);
    throw new Error('Failed to fetch expense by ID: ' + error.message);
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    return await prisma.expense.update({
      where: {
        id: id,
      },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.error('Error updating expense:', error.message);
    throw new Error('Failed to update expense: ' + error.message);
  }
};

export const deleteExpense = async (id) => {
  try {
    return await prisma.expense.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error('Error deleting expense:', error.message);
    throw new Error('Failed to delete expense: ' + error.message);
  }
};
