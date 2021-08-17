import React from "react";
import { connect } from "react-redux";
import { aws_s3_uri } from "./../../../../../../config";
import "./shopping-cart-menu.css";
import Icon from "@material-ui/core/Icon";
const ShoppingCartMenu = ({ shop: { cart } }) => {
  const removeItem = (e, item) => {
    e.stopPropagation();
  };
  return (
    <div className="cart-content">
      {cart.length > 0 ? (
        <div className="w-full h-full overflow-auto">
          <div className="item-content mb-10">
          {cart.map((o) => (
            <div
              className="flex w-full p-2 cart-item cursor-pointer"
              key={o._id}
              onClick={() => {
                console.log("called");
              }}
            >
              <img
                className="w-20 h-20"
                src={aws_s3_uri + "/" + o.thumbnail}
                alt=""
              />
              <div className="flex items-start justify-evenly flex-col ml-2 w-full">
                <span className="font-semibold underline">{o.name}</span>
                <span className="text-xs">Quantity: 1</span>
                <div className="w-full flex justify-end">
                  <Icon
                    style={{ fontSize: 22 }}
                    onClick={(e) => removeItem(e, o)}
                  >
                    delete_outline
                  </Icon>
                </div>
              </div>
            </div>
          ))}
          </div>
          <div className="w-full flex justify-center items-center bg-white absolute bottom-0 py-2 border-t border-gray-400 cursor-pointer font-semibold">GO TO CART</div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          No Items in cart
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  shop: state.shop,
});

export default connect(mapStateToProps)(ShoppingCartMenu);
