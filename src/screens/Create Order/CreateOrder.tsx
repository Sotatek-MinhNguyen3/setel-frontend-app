import React, { useState } from "react";
import { Form, Button, InputNumber, Alert } from "antd";
import "./CreateOrder.scss";
import { useEffect } from "react";
import { useStoreActions } from "../../store/hooks";
import { Order } from "../../common/interface";
import { ORDER_STATUS } from "../../common/constant";

type LayoutType = Parameters<typeof Form>[0]["layout"];

export interface IAppProps {}

const CreateOrder = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProccessing, setIsProccessing] = useState(false);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const createOrder = useStoreActions((actions) => actions.createOrder);

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 3 },
          wrapperCol: { span: 14 },
        }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: { span: 14, offset: 3 },
        }
      : null;

  const handleCreateOrder = () => {
    const userId = Math.ceil(Math.random() * 3);
    if (price === 0) setShowAlert(true);
    else {
      setIsProccessing(true);
      createOrder({
        uid: userId.toString(),
        priceEach: price,
        status: ORDER_STATUS.CREATED,
        quantity: quantity,
      })
        .then((data: Order) => {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 2000);
          setShowAlert(false);
          setIsProccessing(false);
        })
        .then((error: any) => {
          setIsProccessing(false);
          console.log(error);
        });
    }
  };

  return (
    <div className="createOrder">
      <h2 className="title">Create Order</h2>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item className="label" label="Quantity">
          <InputNumber
            className="inputNumber"
            min={1}
            defaultValue={0}
            onChange={(value) => setQuantity(Number(value))}
            placeholder="Quantity for order..."
          />
        </Form.Item>
        <Form.Item className="label" label="Price per Item">
          <InputNumber
            className="inputNumber"
            min={0}
            defaultValue={0}
            onChange={(value) => setPrice(Number(value))}
            placeholder="Price for each item..."
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button
            className="createBtn"
            loading={isProccessing}
            onClick={() => handleCreateOrder()}
          >
            Create Order
          </Button>
        </Form.Item>
      </Form>

      {showAlert && (
        <Alert
          className="warning"
          message="Warning"
          description="Please make sure price per item is  > 0."
          type="warning"
          showIcon
        />
      )}

      {showSuccess && (
        <Alert
          className="warning"
          message="Create order successfully!"
          type="success"
          showIcon
        />
      )}
    </div>
  );
};

export default CreateOrder;
