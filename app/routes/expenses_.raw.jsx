import {getExpenses} from "../data/expenses.server.js";

export const loader = async ()=>{
  return getExpenses();
}