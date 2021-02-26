import React, { useState } from "react";
import { Image, Table, Tag, Button } from "antd";
import "./ListOrder.scss";
import { MOCK_IMAGE, ORDER_STATUS } from "../../common/constant";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { Order } from "../../common/interface";
import { useLocation } from "react-router-dom";

import deliveredIcon from "../../assets/icon/box.svg";
import shoppingIcon from "../../assets/icon/shopping-cart.svg";
import canceledIcon from "../../assets/icon/cancel.svg";

export interface IAppProps {}

const { Column } = Table;

const ListOrder = () => {
  const getAllOrders = useStoreActions((actions) => actions.getAllOrders);
  const cancelOrder = useStoreActions((actions) => actions.cancelOrder);
  const payOrder = useStoreActions((actions) => actions.payOrder);
  const setListOrders = useStoreActions((actions) => actions.setListOrders);
  const orders = useStoreState((state) => state.orders);
  const [isProccessing, setIsProccessing] = useState(false);
  const [isProccessingPayment, setIsProccessingPayment] = useState(false);
  const [displayOrders, setDisplayOrders] = useState<Array<Order>>();
  const [currentOrder, setCurrentOrder] = useState<Order>();
  const [deliveredOrder, setDeliveredOrder] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const location = useLocation();
  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    setDisplayOrders(orders);
    if (orders && !currentOrder) setCurrentOrder(orders[0]);
    let deliveredOrder = 0;
    let cancelledOrder = 0;
    orders.forEach((item) => {
      if (item.status === ORDER_STATUS.DELIVERED) deliveredOrder++;
      else if (item.status === ORDER_STATUS.CANCELLED) cancelledOrder++;
    });

    setDeliveredOrder(deliveredOrder);
    setCancelledOrders(cancelledOrder);
  }, [orders]);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/delivered") {
      setDisplayOrders(
        orders.filter((item) => item.status === ORDER_STATUS.DELIVERED)
      );
    } else if (pathname === "/cancelled") {
      setDisplayOrders(
        orders.filter((item) => item.status === ORDER_STATUS.CANCELLED)
      );
    } else if(pathname === '/created') {
      setDisplayOrders(
        orders.filter((item) => item.status === ORDER_STATUS.CREATED)
      );
    }else {
      setDisplayOrders(orders);
    }
  }, [location]);

  const handleCancelOrder = async () => {
    setIsProccessing(true);
    if (currentOrder?._id) {
      const result = await cancelOrder(currentOrder?._id);
      if (result) {
        setCurrentOrder(result);
        setListOrders(orders.map(item => {
          if(item._id === result._id)
            item.status = result.status;
          return item;
        }))
      }
    }
    setIsProccessing(false);
  };

  const handlePayOrder = async () => {
    setIsProccessingPayment(true);
    if (currentOrder?._id) {
      const result = await payOrder(currentOrder?._id);
      if (result) setCurrentOrder(result);
    }
    setIsProccessingPayment(false);
  }

  const getSum = (first: number | undefined, second: number | undefined) => {
    if (first && second) return first * second;
    return 0;
  };

  return (
    <div className="listOrder">
      <div className="summary">
        <div className="summaryItem total">
          <img alt="icon" src={shoppingIcon} />
          <div className="desc">
            <p>Total Orders</p>
            <p>{orders.length}</p>
          </div>
        </div>
        <div className="summaryItem success">
          <img alt="icon" src={deliveredIcon} />
          <div className="desc">
            <p>Orders Delivered</p>
            <p>{deliveredOrder}</p>
          </div>
        </div>
        <div className="summaryItem fail">
          <img alt="icon" src={canceledIcon} />
          <div className="desc">
            <p>Orders Cancelled</p>
            <p>{cancelledOrders}</p>
          </div>
        </div>
      </div>

      <div className="mainContent">
        <div className="dataTable">
          <h2 className="title">List Order</h2>
          <Table
            dataSource={displayOrders}
            rowKey="_id"
            onRow={(r) => ({
              onClick: () => setCurrentOrder(r),
            })}
          >
            <Column
              title="Customer"
              dataIndex="firstName"
              key="firstName"
              render={(text, record) => (
                <div className="customerInTable">
                  <Image
                    className="avatarInTable"
                    preview={false}
                    src={MOCK_IMAGE}
                  />
                  <p>{text}</p>
                </div>
              )}
            />
            <Column title="Quantity" dataIndex="quantity" key="quantity" />
            <Column
              title="Price per Item"
              dataIndex="priceEach"
              key="priceEach"
            />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(tags) => (
                <Tag className={`status ${tags}`} color="blue">
                  {tags}
                </Tag>
              )}
            />
          </Table>
        </div>

        <div className="orderDetail">
          <h2 className="title">Detail Order</h2>
          <hr />
          
          <div className="counting">
            <p>
              <span>{currentOrder?.quantity}</span>items
            </p>
            <p>x</p>
            <p className="pricePerItem">${currentOrder?.priceEach}</p>
          </div>
          <hr />
          <p className="total">
            Total{" "}
            <span>
              ${getSum(currentOrder?.priceEach, currentOrder?.quantity)}
            </span>
          </p>

          {/* <Button
            className={`paymentBtn ${
              currentOrder?.status !== ORDER_STATUS.DELIVERED && "btnPaymentEnable"
            }`}
            disabled={currentOrder?.status === ORDER_STATUS.DELIVERED}
            onClick={() => handlePayOrder()}
            loading={isProccessingPayment}
          >
            Payment
          </Button> */}
          
          <Button
            className={`cancelBtn ${
              currentOrder?.status !== ORDER_STATUS.CANCELLED && "btnEnable"
            }`}
            disabled={currentOrder?.status === ORDER_STATUS.CANCELLED}
            onClick={() => handleCancelOrder()}
            loading={isProccessing}
          >
            Cancel Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
