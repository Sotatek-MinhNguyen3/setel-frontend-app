import * as React from "react";
import Header from "../../components/Header/Header";
import { Image } from "antd";
import "./Dashboard.scss";
import avatar from "../../assets/image/dachshund.jpg";
import { useEffect } from "react";
import { useStoreActions } from "../../store/hooks";
import addIcon from "../../assets/icon/add.svg";
import allIcon from "../../assets/icon/list.svg";
import deliveredIcon from "../../assets/icon/box.svg";
import canceledIcon from "../../assets/icon/cancel.svg";
import shoppingIcon from "../../assets/icon/shopping-cart.svg";

import { Link, Route, Switch, useLocation } from "react-router-dom";
import CreateOrder from "../Create Order/CreateOrder";
import ListOrder from "../ListOrder/ListOrder";

const Dashboard = () => {
  const getAllOrders = useStoreActions((actions) => actions.getAllOrders);
  const pathName = useLocation().pathname;

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <div className="bodyContainer">
        <div className="sideMenu">
          <div className="menu">
            <h4>Menu</h4>
            <Link className={`item ${pathName === '/create' && 'active'}`} to="/create">
              <img alt="icon" src={addIcon} />
              <p>Create </p>
            </Link>
            <Link className={`item ${(pathName === '/list' || pathName === '/') && 'active'}`} to="/list">
              <img alt="icon" src={allIcon} />
              <p>List </p>
            </Link>
            <Link className={`item ${pathName === '/created' && 'active'}`} to="/created">
              <img alt="icon" src={shoppingIcon} />
              <p>Created </p>
            </Link>
            <Link className={`item ${pathName === '/delivered' && 'active'}`} to="/delivered">
              <img alt="icon" src={deliveredIcon} />
              <p>Delivered </p>
            </Link>
            <Link className={`item ${pathName === '/cancelled' && 'active'}`} to="/cancelled">
              <img alt="icon" src={canceledIcon} />
              <p>Cancelled </p>
            </Link>
            
          </div>
        </div>

        <div className="mainContent">
          <Switch>
            <Route exact path="/create" component={CreateOrder} />
            <Route path="/list" component={ListOrder} />
            <Route path="/" component={ListOrder} />
            <Route path="/created" component={ListOrder} />
            <Route path="/delivered" component={ListOrder} />
            <Route path="/cancelled" component={ListOrder} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
