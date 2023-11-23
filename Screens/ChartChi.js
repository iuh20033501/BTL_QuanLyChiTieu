import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart,ArcElement } from "chart.js";
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
Chart.register(ArcElement);

const DoughnutChart2 =  ({ ngay, months }) => {
  const [data, setData] = useState([]);
   console.log(ngay)
   console.log(months)
   useEffect(() => {
    fetch('https://6551ee245c69a779032948e9.mockapi.io/data')
      .then((response) => response.json())
      .then((json) => {
        const dataChi = json.filter((item) => {
          // Chuyển đổi giá trị ngay thành đối tượng Date
          
          const ngayDate = ngay;
  
          // Chuyển đổi giá trị item.date thành đối tượng Date
          const itemDateParts = item.date.split('/');
          const itemDate = new Date(
            parseInt(itemDateParts[2]),
            parseInt(itemDateParts[1]) - 1,
            parseInt(itemDateParts[0])
          );
          
          // Lọc dữ liệu với điều kiện status === false, view === true và item.date nằm trong khoảng thời gian ngay đến ngay + 1 tháng
          return !item.status && item.view && isDateWithinRange(itemDate, ngayDate, addMonths(ngayDate, months));
        });
        setData(dataChi);
      });
  }, [ngay]);
  
  // Hàm kiểm tra xem date có nằm trong khoảng thời gian startDate đến endDate không
  const isDateWithinRange = (date, startDate, endDate) => {
    console.log(startDate);
    console.log(endDate);
    return date >= startDate && date < endDate;
  };
  
  // Hàm thêm tháng cho một ngày cụ thể
  const addMonths = (date, months) => {
    const result = new Date(date);
  
    // Lấy ra thông tin về ngày, tháng và năm
    const currentMonth = result.getMonth();
    const currentYear = result.getFullYear();
    const currentDay = result.getDate();
  
    // Tính toán tháng mới
    const newMonth = (currentMonth + months) % 12;
    const monthsToAdd = Math.floor((currentMonth + months) / 12);
  
    // Tính toán năm mới
    const newYear = currentYear + monthsToAdd;
  
    // Thiết lập tháng và năm mới
    result.setMonth(newMonth);
    result.setFullYear(newYear);
  
    // Tránh tình huống khi tháng mới có số ngày ít hơn tháng cũ (đến ngày 31 tháng 1 chẳng hạn)
    const newMonthDays = new Date(newYear, newMonth + 1, 0).getDate();
    result.setDate(Math.min(currentDay, newMonthDays));
  
    return result;
  };
  
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
 
  // Tạo mảng màu ngẫu nhiên
  const backgroundColors = Array.from({length: data.length}, () => getRandomColor());

  console.log(names)
  const chartData2 = {
    labels: data.map((item) => item.name),
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
