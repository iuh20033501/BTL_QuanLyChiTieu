import React, { useState, useEffect } from 'react';

const TongThu = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch your data here
    fetch('https://6551ee245c69a779032948e9.mockapi.io/data')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  // Tính tổng chi
  const calculateTotalThu = () => {
    return data.reduce((total, item) => {
      if (item.status) {
        // Chi tiêu (status: false)
        return total + item.money;
      }
      return total;
    }, 0);
  };

  const totalThu = calculateTotalThu();

  return (
    <div>
      <p>{totalThu}</p>
    </div>
  );
};

export default TongThu;
