import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TouchableOpacity,TextInput, Image,ScrollView} from 'react-native';
import { useState,useEffect } from 'react';
import DoughnutChart from './ChartThu';
import DoughnutChart2, { CalculateTotalChi } from './ChartChi';
  import { Doughnut } from 'react-chartjs-2';
  import { ArcElement } from "chart.js";
import DateTimePicker from 'react-datetime-picker';

export default function ThongKe({navigation}) {
    const[show,setShow]= useState(false)
    const[show2,setShow2]= useState(false)
    const[thang,setThang]= useState(true)
    const [data, setData] = useState([]);
     //const [datathu, setDataThu] = useState([]);
    // const [datachi, setDataChi] = useState([]);
    const [click,setClick] = useState(false)
    const [value,setValue] = useState(new Date())
     const[ngay,setNgay]=useState();
    const clickMouse = () => {
      // Khi TouchableOpacity được nhấp, chuyển giá trị click sang true
     if(click===false) setClick(true);
     else  setClick(false)
  
    };

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
             if (thang)
             // Lọc dữ liệu với điều kiện status === false, view === true và item.date nằm trong khoảng thời gian ngay đến ngay + 1 tháng
             return  item.view && isDateWithinRange(itemDate,  addMonths(ngayDate, 1),ngayDate);
              else  return  item.view && isDateWithinRange(itemDate,  addMonths(ngayDate, 12),ngayDate);
           });
           setData(dataChi);
         });
     }, [ngay,thang]);
     
     
     
     // Hàm kiểm tra xem date có nằm trong khoảng thời gian startDate đến endDate không
     const isDateWithinRange = (date, startDate, endDate) => {
       // console.log(startDate);
       // console.log(endDate);
       return date >= startDate && date < endDate;
     };
     
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
    
      // Tính tổng chi
       const calculateTotalChi = () => {
        return data.reduce((total1, item) => {
          if (!item.status) {
            // Chi tiêu (status: false)
            return total1 + item.money;
          }
          return total1;
        }, 0);
      };
    
      // Tính tổng thu
      const calculateTotalThu = () => {
        return data.reduce((total, item) => {
          if (item.status) {
            // Thu nhập (status: true)
            return total + item.money;
          }
          return total;
        }, 0);
      };
    
      const totalThu = calculateTotalThu();
      const totalChi = calculateTotalChi();
      // Tính chênh lệch
      const chenhLech = totalThu - totalChi;
      let formattedChenhLech;

      if (chenhLech > 0) {
        formattedChenhLech = `+${chenhLech}`;
      } else if (chenhLech < 0) {
        formattedChenhLech = `${chenhLech}`;
      } else {
        formattedChenhLech = '0'; // Trường hợp chenhLech bằng 0
      }

    useEffect(() => {
      setNgay(value)
  },[value])
   


 return (
    <View style={styles.container}>
             <View style={styles.row}>
            <View style={{borderRadius:8,backgroundColor:'#808080',width:'50%',height:30,flexDirection:'row'}}>
             <TouchableOpacity style={{ width:'50%',backgroundColor:thang?'#FFA500':"#808080", borderRadius:8,justifyContent:'center',alignItems:'center'}} onPress={()=>setThang(true)}>
                 <Text style={{color:!thang?'#FFA500':'white',fontWeight:'bold'}}>Hàng tháng</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{ width:'50%',backgroundColor:thang?"#808080":'#FFA500', borderRadius:8,justifyContent:'center',alignItems:'center'}} onPress={()=>setThang(false)}>
             <Text style={{color:!thang?'white':'#FFA500',fontWeight:'bold'}}>Hàng năm </Text>
             </TouchableOpacity>
            </View>
        
         </View>
         {thang&&(
            <View >
              <View style={{flexDirection:'column'}}>
              <View style={{flexDirection:'row', height: click ? 320 : 40 ,justifyContent:'flex-start',alignItems:'center',marginLeft:15}}>
                <Text style={{fontSize:16, fontWeight:'bold', marginLeft:-3}}>Ngày</Text>
                <View style={{height:30,width:225, backgroundColor:'#F2F3D6', borderWidth:1,borderRadius:10,marginLeft:30}}>
                <Text style={styles.Textheader}>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</Text>
                </View>
              <TouchableOpacity onPress={clickMouse} style={styles.Buttun2}>
              <Text style={styles.Text2}>{click ? 'OK' : 'CHỌN'}</Text>
                </TouchableOpacity>
                </View>
             {click&&( <DateTimePicker
         onChange={setValue}
         value={value}
         isCalendarOpen
         onCalendarClose={clickMouse}
     />)}
              </View>
              <View style={{flexDirection:'row',justifyContent:'flex-start',height:30}}>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'45.5%', borderWidth:1, borderRadius:5,marginLeft:10}}>
                   
                        <Text style={styles.Text}>Chi tiêu</Text>
                        <Text style={{color:'#F55E02', fontWeight:'bold',marginLeft:0}}>-{totalChi}</Text>
                        <Text style={{color:'#F55E02',fontWeight:'bold'}}>đ</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'45.5%', borderWidth:1, borderRadius:5, marginLeft:10}}>
                        <Text style={styles.Text}>Thu nhập</Text>
                        <Text style={{color:'#02AFF5',fontWeight:'bold',marginLeft:-10}}>+{totalThu}</Text>
                        <Text style={{color:'#02AFF5',fontWeight:'bold'}}>đ</Text>
                    </View>
              </View>
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'94%',height:30, marginTop:4, borderWidth:1, borderRadius:5, marginLeft:10}}>
                        <Text style={styles.Text}>Chênh lệch thu chi</Text>
                        <Text style={{color:'#72B96E',fontWeight:'bold',marginLeft:82}}>{formattedChenhLech}</Text>
                        <Text style={{color:'#72B96E',fontWeight:'bold'}}>đ</Text>
              </View>
              <View style={{width:'100%',height:50, justifyContent:'flex-start',alignItems:'center',flexDirection:"row", marginTop:4}}>
                <TouchableOpacity style={{backgroundColor:show?'#E6E6E6':'white',width:'50%',height:50,alignItems:'center',justifyContent:"center",flexDirection:'row'}} onPress={()=>setShow(false)}>
                <Image source={require('../assets/tienluong.png')} style={{height:'50%',width:'30%',resizeMode:'contain',color:show?'gray':'#FFA500'}}></Image>
                 <Text style={{color:show?'gray':'#FFA500',fontWeight:'bold'}}>Chi tiêu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:show?'white':'#E6E6E6',width:'50%',height:50,alignItems:'center',justifyContent:'center',flexDirection:'row'}} onPress={()=>setShow(true)}>
                <Image source={require('../assets/muasam.png')} style={{height:'50%',width:'30%',resizeMode:'contain'}}></Image>
                <Text style={{color:show?'#FFA500':'gray',fontWeight:'bold'}}>Thu nhập </Text>
                </TouchableOpacity>
             </View>

              {!show&& (
                <ScrollView style={{height:400,width:"100%"}}>
                                          <Text style={{fontSize:18, fontWeight:'bold', marginLeft:140}}>BIỂU ĐỒ CHI</Text>
                                          <ScrollView><DoughnutChart2 ngay={ngay} months={"1"} ></DoughnutChart2></ScrollView>
                  
                </ScrollView>
                
              )}
              {show&& (
                <ScrollView style={{height:400,width:"100%"}}>
                                                            <Text style={{fontSize:18, fontWeight:'bold', marginLeft:140}}>BIỂU ĐỒ THU</Text>

                    <ScrollView><DoughnutChart  ngay={ngay} months={"1"}></DoughnutChart>  </ScrollView>  
                </ScrollView>
              )}
            </View>
           )}
           {!thang&&(
            <View >
              <View style={{flexDirection:'column'}}>
              <View style={{flexDirection:'row', height: click ? 320 : 40 ,justifyContent:'flex-start',alignItems:'center',marginLeft:15}}>
                <Text style={{fontSize:16, fontWeight:'bold', marginLeft:-3}}>Ngày</Text>
                <View style={{height:30,width:225, backgroundColor:'#F2F3D6', borderWidth:1,borderRadius:10,marginLeft:30}}>
                <Text style={styles.Textheader}>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</Text>
                </View>
              <TouchableOpacity onPress={clickMouse} style={styles.Buttun2}>
              <Text style={styles.Text2}>{click ? 'OK' : 'CHỌN'}</Text>
                </TouchableOpacity>
                </View>
             {click&&( <DateTimePicker
         onChange={setValue}
         value={value}
         isCalendarOpen
         onCalendarClose={clickMouse}
     />)}
              </View>
              <View style={{flexDirection:'row',justifyContent:'flex-start',height:30}}>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'45.5%', borderWidth:1, borderRadius:5,marginLeft:10}}>
                   
                        <Text style={styles.Text}>Chi tiêu</Text>
                        <Text style={{color:'#F55E02', fontWeight:'bold',marginLeft:0}}>-{totalChi}</Text>
                        <Text style={{color:'#F55E02',fontWeight:'bold'}}>đ</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'45.5%', borderWidth:1, borderRadius:5, marginLeft:10}}>
                        <Text style={styles.Text}>Thu nhập</Text>
                        <Text style={{color:'#02AFF5',fontWeight:'bold',marginLeft:-10}}>+{totalThu}</Text>
                        <Text style={{color:'#02AFF5',fontWeight:'bold'}}>đ</Text>
                    </View>
              </View>
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'94%',height:30, marginTop:4, borderWidth:1, borderRadius:5, marginLeft:10}}>
                        <Text style={styles.Text}>Chênh lệch thu chi</Text>
                        <Text style={{color:'#72B96E',fontWeight:'bold',marginLeft:82}}>{formattedChenhLech}</Text>
                        <Text style={{color:'#72B96E',fontWeight:'bold'}}>đ</Text>
              </View>
              <View style={{width:'100%',height:50, justifyContent:'flex-start',alignItems:'center',flexDirection:"row", marginTop:4}}>
                <TouchableOpacity style={{backgroundColor:show2?'#E6E6E6':'white',width:'50%',height:50,alignItems:'center',justifyContent:"center",flexDirection:'row'}} onPress={()=>setShow2(false)}>
                <Image source={require('../assets/tienluong.png')} style={{height:'50%',width:'30%',resizeMode:'contain'}}></Image>
                 <Text style={{color:show2?'gray':'#FFA500',fontWeight:'bold'}}>Chi tiêu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:show2?'white':'#E6E6E6',width:'50%',height:50,alignItems:'center',justifyContent:'center',flexDirection:'row'}} onPress={()=>setShow2(true)}>
                <Image source={require('../assets/muasam.png')} style={{height:'50%',width:'30%',resizeMode:'contain'}}></Image>
                <Text style={{color:show2?'#FFA500':'gray',fontWeight:'bold'}}>Thu nhập </Text>
                </TouchableOpacity>
             </View>
             {!show2&& (
                <ScrollView style={{height:400,width:"100%"}}>
                                          <Text style={{fontSize:18, fontWeight:'bold', marginLeft:140}}>BIỂU ĐỒ CHI</Text>
                  <DoughnutChart2 ngay={ngay} months={"12"}></DoughnutChart2>
                </ScrollView>
                
              )}
              {show2&& (
                <ScrollView style={{height:400,width:"100%"}}>
                                                            <Text style={{fontSize:18, fontWeight:'bold', marginLeft:140}}>BIỂU ĐỒ THU</Text>

                     <DoughnutChart ngay={ngay} months={"12"}></DoughnutChart>   
                </ScrollView>
              )}
            </View>
           )}

<View style={{width:'100%',height:50,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',bottom:0, position: 'absolute',}}>
            <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}   onPress={()=>navigation.navigate('Menu')}>
         
                              <Image source={require('../assets/home.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Nhập vào </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}   onPress={()=>navigation.navigate('Timkiem')}>
         
                              <Image source={require('../assets/timkiem.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Tìm kiếm </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: '#FFA500',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}  >
         
                              <Image source={require('../assets/thongke.png')} style={styles.Img}></Image>
                              <Text style={{color:'white'}}>Thống kê </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}   onPress={()=>navigation.navigate('Khac')}>
         
                              <Image source={require('../assets/khac.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Khác</Text>
                          
            </TouchableOpacity>
           </View>
         </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Text2:{
    fontSize:16,
    fontWeight:'bold',
    
   
},
  Text:{
    fontSize:16,
    fontWeight:'bold',
    marginLeft:5,
    width:"50%"
},
  Buttun:{
    width:'50%',
    backgroundColor:'#FFA500',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center'
  },
  Buttun2:{
    width:60,
    height:30,
    backgroundColor:'#F2F3D6',
    borderRadius:10,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10
  },
  Textheader:{
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center',
    alignSelf:'center',
    textAlignVertical:"center",
  },
  Touch:{
    width:'50%',
    backgroundColor:'#808080',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center'
  },    
  row:{
    flexDirection:'row',
    backgroundColor:'#E6E6E6',
    height:'50px',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  Input:{
    backgroundColor:'#E6E6E6',
    height:'80%',
    borderRadius:8, 
    width:250,
    marginRight:20
  },
  List:{
    backgroundColor:'#E6E6E6',
    height:300,
    width:"90%",
    marginBottom:30,
    marginTop:10,
    justifyContent:'center',
    marginLeft:'5%',
    flexWrap:'wrap',
    flexDirection:'row'

  },
  Img:{
    height:'40%',
    width:'100%',
    marginBottom:2,
    resizeMode:'contain'
  },

});