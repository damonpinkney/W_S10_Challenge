import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../state/ordersSlice';
import { setFilter } from '../state/filterSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const orderStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    if (orderStatus === 'idle') {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  const filteredOrders = orders.filter((order) => filter === 'All' || order.size === filter);

  let content;

  if (orderStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (orderStatus === 'succeeded') {
    content = (
      <ol>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <strong>{order.fullName}</strong> ordered a size {order.size} pizza with toppings: {order.toppings.join(', ')}
          </li>
        ))}
      </ol>
    );
  } else if (orderStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {content}
      <div id="sizeFilters">
        Filter by size:
        <button className={`button-filter ${filter === 'All' ? 'active' : ''}`} data-testid="filterBtnAll" onClick={() => dispatch(setFilter('All'))}>
          All
        </button>
        <button className={`button-filter ${filter === 'S' ? 'active' : ''}`} data-testid="filterBtnS" onClick={() => dispatch(setFilter('S'))}>
          S
        </button>
        <button className={`button-filter ${filter === 'M' ? 'active' : ''}`} data-testid="filterBtnM" onClick={() => dispatch(setFilter('M'))}>
          M
        </button>
        <button className={`button-filter ${filter === 'L' ? 'active' : ''}`} data-testid="filterBtnL" onClick={() => dispatch(setFilter('L'))}>
          L
        </button>
      </div>
    </div>
  );
};

export default OrderList;
