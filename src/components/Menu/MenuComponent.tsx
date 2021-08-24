import React, { FC } from "react";
import { menuItems } from "./menuItems";

const MenuComponent: FC = () => {
  const itemsOnTheMenu = menuItems.map((item) => {
    return (
      <div>
        <div>{item.name}</div>
        <div>
          {item.price.toLocaleString("sv-se", {
            style: "currency",
            currency: "SEK",
          })}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1>What's on the menu</h1>
      <section>{itemsOnTheMenu}</section>
    </div>
  );
};

export default MenuComponent;
