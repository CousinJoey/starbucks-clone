import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/navbar";
import PreviousCart from "./historySubComponents/previousCarts";
import { useAuth } from "../../../context/authContext";
import PropTypes from "prop-types";

function History({ logoData, fetchUserOrderHistory }) {
  const { currentUser } = useAuth();

  const [previousCarts, setPreviousCarts] = useState(undefined);

  useEffect(() => {
    const fetchHistory = async () => {
      const previousOrders = await fetchUserOrderHistory(currentUser.uid);
      setPreviousCarts(previousOrders);
    };

    fetchHistory();
  }, [currentUser]);

  if (previousCarts === undefined) {
    return (
      <div className="loading-placeholder loading-centered">
        <div className="loading-circle"></div>
      </div>
    );
  }

  if (previousCarts.length === 0) {
    return (
      <div>
        <p>Empty Previous Carts Test</p>
      </div>
    );
  }

  const reversedCarts = [...previousCarts].reverse();

  return (
    <div>
      <Navbar data={logoData} />
      <main className="account-history-main">
        <div className="history-items-and-header-container">
          <div className="history-header-container">
            <h1>History</h1>
          </div>
          <div className="item-order-history-container">
            <div className="items-container order-history-items-container">
              {reversedCarts.length > 0 ? (
                reversedCarts.map((order, index) => (
                  <div key={index} className="individual-order-container">
                    <div className="order-total-and-timestamp-container">
                      <p className="timestamp-value">
                        {new Date(order.timestamp).toLocaleDateString(
                          undefined,
                          {
                            month: "numeric",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      <p className="order-total-value">${order.total}</p>
                    </div>
                    {order.items.map((item, itemIndex) => (
                      <PreviousCart key={itemIndex} item={item} />
                    ))}
                  </div>
                ))
              ) : (
                <p>No recent activity items</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

History.propTypes = {
  logoData: PropTypes.array.isRequired,
  fetchUserOrderHistory: PropTypes.func.isRequired,
};

export default History;
