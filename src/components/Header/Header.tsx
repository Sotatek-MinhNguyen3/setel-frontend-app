import * as React from "react";
import "./Header.scss";
import { Input, Image } from "antd";
import logo from "../../assets/image/logo.svg";
import defaultAvatar from "../../assets/image/dachshund.jpg";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;

interface Props {
  onSearch?: () => void;
}

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#3da496",
    }}
  />
);
const Header = ({ onSearch }: Props) => {
  return (
    <div className="compHeader">
      <Link to="/" className="leftSide">
        <Image className="logo" preview={false} src={logo} width={25} />
        <h3>Order Management</h3>
        <Input
          className="searchInput"
          onChange={onSearch}
          placeholder="Search everything"
          suffix={suffix}
        />
      </Link>

      <div className="rightSide">
        <Image
          className="avatar"
          preview={false}
          src={defaultAvatar}
          width={25}
        />
        <p>John Doe</p>
      </div>
    </div>
  );
};

export default Header;
