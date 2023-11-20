import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart,ArcElement } from "chart.js";

Chart.register(ArcElement);

const DoughnutChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://6551ee245c69a779032948e9.mockapi.io/data')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  // useEffect(() => {
   
  //   if (route.params && route.params.da) {
  //     // Kiểm tra xem route.params.link tồn tại và có giá trị
  //     setData(route.params.da);
     
  //     // tongTien();
  //     // console.log(tongTien())
      
  //   }
    
  // },[route.params]);


  console.log(data);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Chuyển đổi dữ liệu từ mảng đối tượng thành các mảng thích hợp cho biểu đồ
  const names = data.map((item) => item.name);
  const amounts = data.map((item) => item.money);

  const testname = data.forEach((item) => item.name);
  // Tạo mảng màu ngẫu nhiên
  const backgroundColors = Array.from({length: data.length}, () => getRandomColor());

  console.log(names)
  const chartData = {
    labels:  names,
    datasets: [
      {
        data: amounts,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        font: {
          weight: 'bold',
        },
      },
    },
    title: {
      display: true,
      text: 'Thống kê chi tiêu',
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
