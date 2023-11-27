import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart,ArcElement } from "chart.js";
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScrollView, TouchableOpacity, View } from 'react-native';
Chart.register(ArcElement);
const DoughnutChart2 =  ({ ngay, months }) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [data2, setData2] = useState([]);
  const [data, setData] = useState([]);
   console.log(ngay)
   console.log(months)
   useEffect(() => {
    fetch('https://6551ee245c69a779032948e9.mockapi.io/data')
      .then((response) => response.json())
      .then((json) => {
        const dataChi = json.filter((item) => {
         
          
          const ngayDate = ngay;
  
        
          const itemDateParts = item.date.split('/');
          const itemDate = new Date(
            parseInt(itemDateParts[2]),
            parseInt(itemDateParts[1]) - 1,
            parseInt(itemDateParts[0])
          );
          
         
          return !item.status && item.view && isDateWithinRange(itemDate,  addMonths(ngayDate, months),ngayDate);
        });
        setData(dataChi);
      });
  }, [ngay,months]);
  
  
  
  
  const isDateWithinRange = (date, startDate, endDate) => {
    
    return date >= startDate && date < endDate;
  };
  
  
  const addMonths = (date, months) => {
    const result = new Date(date);
  
   
    const currentMonth = result.getMonth()+1;
    const currentYear = result.getFullYear();
    const currentDay = result.getDate();
    
  
   
    const newMonth = ((currentMonth - months + 11) % 12 + 12) % 12;
    const monthsToAdd = Math.floor((months-currentMonth  + 12) / 12);
    
   

  
    
    const newYear = currentYear - monthsToAdd;
  
    
    result.setMonth(newMonth);
    result.setFullYear(newYear);
    
    
    const newMonthDays = new Date(newYear, newMonth+1, 0).getDate();
    result.setDate(Math.min(currentDay, newMonthDays));
  
    return result;
  };
  
  useEffect(() => {
    
 
      const updatedData2 = [...data2];

      data.forEach((item1) => {
        const matchingItemIndex = updatedData2.findIndex((item2) => item1.name === item2.name);

        if (matchingItemIndex !== -1) {
         
          updatedData2[matchingItemIndex].money += item1.money;
        } else {
         
          updatedData2.push({ ...item1 });
        }
      });

      setData2(updatedData2);
   
  }, [data]);
  


 

   console.log(data);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

 
  const names = data2.map((item) => item.name);
  const amounts = data2.map((item) => item.money);

  
  const backgroundColors = Array.from({length: data2.length}, () => getRandomColor());

 
  const chartData2 = {
    labels: data2.map((item) => item.name),
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
        {data2.map((item, index) => (
          
          <li key={item.id} style={{ color: backgroundColors[index] }}>
             <FontAwesomeIcon icon={faSquare} style={{width:50}} />
            {item.name}: {item.money}đ
          </li>
        ))}
      </ul>
      <ScrollView>
        {data.map((item,index)=>{
          <TouchableOpacity style={{backgroundColor:'white',height:50,width:'100%',justifyContent:'center',alignItems:'center'}} key={index}  onMouseEnter={() => setHoveredItemId(item.id)} onPress={()=>{Setchi(item.id);SetName(item.name);SetImg(item.image)}} onMouseLeave={() => setHoveredItemId(chi)}>
            <View style={{backgroundColor: hoveredItemId === item.id ? '#FFA500':'white',justifyContent:'center',flexDirection:'column',alignItems:'center',height:'100%',width:'100%'}} >
              <Text style={{color: hoveredItemId === item.id ? 'white':'gray'}}>{item.name}</Text>
           </View>
        </TouchableOpacity>
        })}
      </ScrollView>
    </div>
  );
};

export default DoughnutChart2;

