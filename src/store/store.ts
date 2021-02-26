import { action, Action, createStore, thunk, Thunk } from "easy-peasy";
import { client } from "../api/config";
import { ApiRequestUrl } from "../api/constant";
import { onError, parseResult } from "../api/util";
import { Order } from "../common/interface";

export interface OrderModel {
  orders: Order[];
  setListOrders: Action<OrderModel, Order[]>;
  getAllOrders: Thunk<OrderModel>;
  createOrder: Thunk<OrderModel, Order>;
  cancelOrder: Thunk<OrderModel, string>;
  payOrder: Thunk<OrderModel, string>;
}

export const stores = createStore<OrderModel>({
  orders: [],
  setListOrders: action((state, payload) => {
    state.orders = payload;
  }),
  getAllOrders: thunk(async (actions, payload) => {
    try {
      const result = await client({
        method: "GET",
        url: `${ApiRequestUrl.ORDER}`,
      });

      const addUserResult = parseResult(result).map(
        (item: Order, index: number) => {
          return { ...item, firstName: "John Doe", id: "" };
        }
      );
      actions.setListOrders(addUserResult);
    } catch (error) {
      onError(error);
    }
  }),

  createOrder: thunk(async (actions, payload) => {
    try {
      const result = await client({
        data: payload,
        method: "POST",
        url: `${ApiRequestUrl.ORDER}`,
      });
      return parseResult(result);
    } catch (error) {
      onError(error);
    }
  }),

  cancelOrder: thunk(async (actions, orderId) => {
    try {
      const result = await client({
        method: "PATCH",
        url: `${ApiRequestUrl.ORDER}/${orderId}`,
      });
      return parseResult(result);
    } catch (error) {
      onError(error);
    }
  }),

  payOrder: thunk(async (actions, orderId) => {
    try {
      const result = await client({
        method: "GET",
        url: `${ApiRequestUrl.ORDER}/${ApiRequestUrl.PAYMENT}/${orderId}`,
      });
      return parseResult(result);
    } catch (error) {
      onError(error);
    }
  }),
});
