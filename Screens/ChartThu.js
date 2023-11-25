import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart,ArcElement } from "chart.js";
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
Chart.register(ArcElement);

const DoughnutChart =  ({ ngay, months }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  
  // console.log(ngay)
  // console.log(months)
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
         return item.status && item.view && isDateWithinRange(itemDate, addMonths(ngayDate, months), ngayDate);
       });
       setData(dataChi);
     });
 }, [ngay]);

 
 // Hàm kiểm tra xem date có nằm trong khoảng thời gian startDate đến endDate không
 const isDateWithinRange = (date, startDate, endDate) => {
   return date >= startDate && date < endDate;
 };
 
 // Hàm thêm tháng cho một ngày cụ thể
  // Hàm thêm tháng cho một ngày cụ thể
  const addMonths = (date, months) => {
    const result = new Date(date);
  
    // Lấy ra thông tin về ngày, tháng và năm
    const currentMonth = result.getMonth()+1;
    const currentYear = result.getFullYear();
    const currentDay = result.getDate();
    
  
    // Tính toán tháng mới
    const newMonth = ((currentMonth - months + 11) % 12 + 12) % 12;
    const monthsToAdd = Math.floor((months-currentMonth  + 12) / 12);
    
    // console.log(monthsToAdd);
    // console.log(newMonth);
    // console.log(currentMonth);
    // console.log(monthsToAdd);

  
    // Tính toán năm mới
    const newYear = currentYear - monthsToAdd;
  
    // Thiết lập tháng và năm mới
    result.setMonth(newMonth);
    result.setFullYear(newYear);
    
    // Tránh tình huống khi tháng mới có số ngày ít hơn tháng cũ (đến ngày 31 tháng 1 chẳng hạn)
    const newMonthDays = new Date(newYear, newMonth+1, 0).getDate();
    result.setDate(Math.min(currentDay, newMonthDays));
  
    return result;
  };
  useEffect(() => {
    // Hàm kiểm tra và cập nhật dữ liệu
 
      const updatedData2 = [...data2];

      data.forEach((item1) => {
        const matchingItemIndex = updatedData2.findIndex((item2) => item1.name === item2.name);

        if (matchingItemIndex !== -1) {
          // Nếu tìm thấy mục trùng, cộng dồn money vào mục tương ứng trong data2
          updatedData2[matchingItemIndex].money += item1.money;
        } else {
          // Nếu không tìm thấy mục trùng, thêm mục đó vào data2
          updatedData2.push({ ...item1 });
        }
      });

      setData2(updatedData2);
   
  }, [data]);

  // console.log(data);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Chuyển đổi dữ liệu từ mảng đối tượng thành các mảng thích hợp cho biểu đồ
  const names = data2.map((item) => item.name);
  const amounts = data2.map((item) => item.money);

  const testname = data2.forEach((item) => item.name);
  // Tạo mảng màu ngẫu nhiên
  const backgroundColors = Array.from({length: data2.length}, () => getRandomColor());

  // console.log(names)
  const chartData = {
    labels:  data2.map((item) => item.name),
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
      <Doughnut data={chartData} options={options} />
      <p>Danh sách thu:</p>
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

export default DoughnutChart;
