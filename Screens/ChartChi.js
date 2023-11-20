import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart,ArcElement } from "chart.js";
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
Chart.register(ArcElement);

const DoughnutChart2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://6551ee245c69a779032948e9.mockapi.io/data')
      .then((response) => response.json())
      .then((json) => {
        const dataChi = json.filter((item) => item.status === false);
        setData(dataChi);
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
  const chartData2 = {
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
        // formatter: (value, context) => {
        //   return `$${value}`;
        // },
      },
    },
    title: {
      display: true,
      text: 'Thống kê chi tiêu',
    },
  };

  return (
    <div>
      <Doughnut data={chartData2} options={options} />
      <p>Danh sách chi tiêu:</p>
      <ul>
        {data.map((item, index) => (
          <li key={item.id} style={{ color: backgroundColors[index] }}>
             <FontAwesomeIcon icon={faSquare} style={{width:50}} />
            {item.name}: {item.money}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoughnutChart2;
