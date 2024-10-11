// components/OrderList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../state/ordersSlice';
import { setFilter } from '../state/filterSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders) || [];
  const orderStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    if (orderStatus === 'idle') {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  const filteredOrders =
    filter === 'All' ? orders : orders.filter((order) => order.size === filter);

  let content;

  if (orderStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (orderStatus === 'succeeded') {
    if (filteredOrders.length > 0) {
      content = (
        <ol>
          {filteredOrders.map((order) => {
            const toppingsCount = order.toppings ? order.toppings.length : 0;
            const toppingsText =
              toppingsCount === 0
                ? 'no toppings'
                : `${toppingsCount} topping${toppingsCount > 1 ? 's' : ''}`;
            return (
              <li key={order.id}>
                {order.customer} ordered a size {order.size} with {toppingsText}
              </li>
            );
          })}
        </ol>
      );
    } else {
      content = <div>No orders found.</div>;
    }
  } else if (orderStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {content}
      <div id="sizeFilters">
        Filter by size:
        <button
          className={`button-filter ${filter === 'All' ? 'active' : ''}`}
          data-testid="filterBtnAll"
          onClick={() => dispatch(setFilter('All'))}
        >
          All
        </button>
        <button
          className={`button-filter ${filter === 'S' ? 'active' : ''}`}
          data-testid="filterBtnS"
          onClick={() => dispatch(setFilter('S'))}
        >
          S
        </button>
        <button
          className={`button-filter ${filter === 'M' ? 'active' : ''}`}
          data-testid="filterBtnM"
          onClick={() => dispatch(setFilter('M'))}
        >
          M
        </button>
        <button
          className={`button-filter ${filter === 'L' ? 'active' : ''}`}
          data-testid="filterBtnL"
          onClick={() => dispatch(setFilter('L'))}
        >
          L
        </button>
      </div>
    </div>
  );
};

export default OrderList;
