import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFullName, setSize, toggleTopping, createOrder } from '../state/pizzaFormSlice';

const PizzaForm = () => {
  const dispatch = useDispatch();
  const { fullName, size, toppings, status, error } = useSelector((state) => state.pizzaForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure the payload is correctly formatted
    const orderPayload = {
      fullName,
      size,
      toppings,
    };
    dispatch(createOrder(orderPayload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {status === 'loading' && <div className="pending">Order in progress...</div>}
      {status === 'failed' && <div className="failure">Order failed: {error}</div>}
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={fullName}
            onChange={(e) => dispatch(setFullName(e.target.value))}
          />
        </div>
      </div>
      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={size}
            onChange={(e) => dispatch(setSize(e.target.value))}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>
      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={toppings.includes('1')}
            onChange={() => dispatch(toggleTopping('1'))}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={toppings.includes('2')}
            onChange={() => dispatch(toggleTopping('2'))}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={toppings.includes('3')}
            onChange={() => dispatch(toggleTopping('3'))}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={toppings.includes('4')}
            onChange={() => dispatch(toggleTopping('4'))}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={toppings.includes('5')}
            onChange={() => dispatch(toggleTopping('5'))}
          />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
};

export default PizzaForm;
