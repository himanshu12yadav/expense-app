import {getExpenses} from "../data/expenses.server.js";
import {requireUserSession} from "../data/auth.server.js";

export const loader = async ({request})=>{
  const userId = await requireUserSession(request)

  return getExpenses(userId);
}