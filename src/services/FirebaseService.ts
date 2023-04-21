import AxiosHttp from "@/http/Axios";
import { UserExpense } from "@/interfaces/expenses/interfaces";
import { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Service class to perform http request to Firebase database
 */
export class FirebaseService {
  private httpInstance: AxiosHttp | null = null;
  private expensesUrl = "/expenses";

  private get http() {
    return this.httpInstance != null ? this.httpInstance : new AxiosHttp();
  }

  constructor() {
    this.httpInstance = new AxiosHttp();
  }

  /**
   * Will call expenses/:userId enpoint to grab all expenses for user
   * @param userId - userId that axpenses should be grabbed for
   */
  async getExpensesForUser(
    userId: string | undefined,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<UserExpense[]>> {
    return this.http.get(this.expensesUrl + `/${userId}.json`, config);
  }

  /**
   * Add a post for specific user id
   * @param data - user expense data
   * @returns success or error
   */
  addExpenseForUser(
    userId: string | undefined,
    expense: UserExpense,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<UserExpense, any>> | null {
    if (!userId) {
      return null;
    }
    return this.http.post<UserExpense>(
      this.expensesUrl + `/${userId}.json`,
      expense,
      config
    );
  }

  /**
   * Get data for expense id
   * @param userId - user auth id
   * @param expenseId - expense id
   * @param config - config options
   * @returns expense with given id
   */
  getExpenseById(
    userId: string | undefined,
    expenseId: string,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<UserExpense>> | null {
    if (!userId) {
      return null;
    }
    return this.http.get<UserExpense>(
      this.expensesUrl + `/${userId}/${expenseId}`,
      config
    );
  }

  /**
   * Edits an expense with given expense id
   * @param userId
   * @param expenseId
   * @param config
   */
  editExpenseById(
    userId: string | undefined,
    expenseId: string,
    expense: UserExpense,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return this.http.put<UserExpense>(
      this.expensesUrl + `/${userId}/${expenseId}.json`,
      expense,
      config
    );
  }
}
