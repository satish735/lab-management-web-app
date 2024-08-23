import React from "react";
const MenuItems = ({ menus, component }) => {
  return (
    <component>
      <li className="parent">
        <a href="#">Popular Toys</a>
        <ul className="child">
          <li className="parent">
            <a href="#">
              Video Games <span className="expand">»</span>
            </a>
            <ul className="child">
              <li>
                <a href="#">Car</a>
              </li>
              <li>
                <a href="#">Bike Race</a>
              </li>
              <li>
                <a href="#">Fishing</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Barbies</a>
          </li>
          <li>
            <a href="#">Teddy Bear</a>
          </li>
          <li className="parent">
            <a href="#">
              Level 1 <span className="expand">»</span>
            </a>
            <ul className="child">
              <li>
                <a href="#">Level 2 - Menu 1</a>
              </li>
              <li>
                <a href="#">Level 2 - Menu 2</a>
              </li>
              <li className="parent">
                <a href="#">
                  Level 2 - Menu 3<span className="expand">»</span>
                </a>
                <ul className="child">
                  <li>
                    <a href="#">Level 3 - Menu 1</a>
                  </li>
                  <li>
                    <a href="#">Level 3 - Menu 2</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </component>
  );
};

export default MenuItems;
