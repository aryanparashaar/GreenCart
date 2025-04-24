import React, { useState, useEffect } from 'react';
import { useAppContext } from '../Context/AppContext';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
    console.log(currency);
  }, []);

  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-end w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>
      
      {myOrders.map((order, index) => (
        <div key={order._id || index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
          <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: {currency}{order.amount}</span>
          </p>

          {order.items?.map((item, idx) => (
  <div
    key={item._id || idx}
    className={`relative bg-white text-gray-500/70 ${
      order.items.length !== idx + 1 ? "border-b" : ""
    } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 md:gap-16 w-full max-w-4xl`}
  >
    {/* Product Info Section */}
    <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
      <div className="bg-primary/10 p-4 rounded-lg">
        <img
          src={item.product.image?.[0] || '/placeholder.png'}
          alt={item.product.name || 'Product'}
          className="w-16 h-16 object-cover"
        />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-medium text-gray-800">
          {item.product.name || 'Unnamed Product'}
        </h2>
        <p>Category: {item.product.category || 'Unknown'}</p>
      </div>
    </div>

    {/* Order Info Section */}
    <div className="md:w-1/3 space-y-1 text-primary text-base md:text-lg font-medium mb-4 md:mb-0">
      <p>Quantity: {item.quantity || "1"}</p>
      <p>Status: {order.status || 'Pending'}</p>
      <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
    </div>

    {/* Price Section */}
    <div className="md:w-1/3 text-right md:text-left text-primary text-lg font-medium">
      <p>Amount: {currency}{item.product.offerPrice * (item.quantity || 1)}</p>
    </div>
  </div>
))}

        </div>
      ))}
    </div>
  );
};

export default MyOrders;

