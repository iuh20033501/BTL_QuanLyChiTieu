import React, { useState, useEffect } from 'react';

const TongChi = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://6551ee245c69a779032948e9.mockapi.io/data')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  // Tính tổng chi
  const calculateTotalChi = () => {
    return data.reduce((total, item) => {
      if (!item.status) {
        // Chi tiêu (status: false)
        return total + item.money;
      }
      return total;
    }, 0);
  };

  const totalChi = calculateTotalChi();

  return (
    <div>
      <p>{totalChi}</p>
    </div>
  );
};

export default TongChi;
