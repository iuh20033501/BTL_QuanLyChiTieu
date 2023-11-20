import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TouchableOpacity,TextInput, Image,ScrollView} from 'react-native';
import { useState,useEffect } from 'react';
import Datepicker from './Datepicker';
import DoughnutChart from './ChartThu';
import DoughnutChart2 from './ChartChi';
import TongChi from './TongChi';
import ChenhLechChiTieu from './ChenhLechChiTieu';
  import { Doughnut } from 'react-chartjs-2';
  import { ArcElement } from "chart.js";
import DateTimePicker from 'react-datetime-picker';
import TongThu from './TongThu';

export default function ThongKe({navigation}) {
    const[show,setShow]= useState(false)
    const[show2,setShow2]= useState(false)
    const[thang,setThang]= useState(true)
    const [data, setData] = useState([]);
     //const [datathu, setDataThu] = useState([]);
    // const [datachi, setDataChi] = useState([]);
    const [click,setClick] = useState(false)
    const [value,setValue] = useState(new Date())

    const clickMouse = () => {
      // Khi TouchableOpacity được nhấp, chuyển giá trị click sang true
     if(click===false) setClick(true);
     else  setClick(false)
  
    };
    useEffect(() => {
      fetch('https://6551ee245c69a779032948e9.mockapi.io/data')
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        });
    }, []);

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
  const chenhLech = Math.abs(totalThu - totalChi);
console.log(chenhLech)
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
              <View style={{flexDirection:'column', width:'80%'}}>
              <View style={{flexDirection:'row', height: click ? 320 : 20 ,justifyContent:'flex-start'}}>
           <Text style={styles.Text2}>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</Text>
           <TouchableOpacity onPress={clickMouse}>
           <Text style={styles.Text2}>{click ? 'OK' : 'DATE'}</Text>
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
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'48%'}}>
                   
                        <Text style={styles.Text}>Chi tiêu</Text>
                        <TongChi></TongChi>
                        <Text>đ</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'48%'}}>
                        <Text style={styles.Text}>Thu nhập</Text>
                      <TongThu></TongThu>
                        <Text>đ</Text>
                    </View>
              </View>
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",height:50,width:'100%'}}>
                        <Text style={styles.Text}>Chênh lệch thu chi</Text>
                        <Text >{chenhLech}</Text>
                        <Text>đ</Text>
              </View>
              <View style={{width:'100%',height:50, justifyContent:'flex-start',alignItems:'center',flexDirection:"row"}}>
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
                <View style={{height:400,width:"100%", alignItems:'center'}}>
                                          <Text style={{fontSize:18, fontWeight:'bold', marginLeft:10}}>BIỂU ĐỒ CHI</Text>
                                          <ScrollView><DoughnutChart2></DoughnutChart2></ScrollView>
                  
                </View>
                
              )}
              {show&& (
                <View style={{height:400,width:"100%",alignItems:'center'}}>
                                                            <Text style={{fontSize:18, fontWeight:'bold', marginLeft:10}}>BIỂU ĐỒ THU</Text>

                    <ScrollView><DoughnutChart></DoughnutChart>  </ScrollView>  
                </View>
              )}
            </View>
           )}
           {!thang&&(
            <View >
              <View style={{flexDirection:'column', width:'80%'}}>
              <View style={{flexDirection:'row', height: click ? 320 : 20 ,justifyContent:'flex-start'}}>
           <Text style={styles.Text2}>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</Text>
           <TouchableOpacity onPress={clickMouse}>
           <Text style={styles.Text2}>{click ? 'OK' : 'DATE'}</Text>
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
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'48%'}}>
                        <Text style={styles.Text}>Chi tiêu</Text>
                        <TongChi></TongChi>
                        <Text>đ</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",width:'48%'}}>
                        <Text style={styles.Text}>Thu nhập</Text>
                        <TongThu></TongThu>
                        <Text>đ</Text>
                    </View>
              </View>
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:"E6E6E6",height:50,width:'100%'}}>
              <Text style={styles.Text}>Chênh lệch thu chi</Text>
                        <Text >{chenhLech}</Text>
                        <Text>đ</Text>
              </View>
              <View style={{width:'100%',height:50, justifyContent:'flex-start',alignItems:'center',flexDirection:"row"}}>
                <TouchableOpacity style={{backgroundColor:show2?'#E6E6E6':'white',width:'50%',height:50,alignItems:'center',justifyContent:"center",flexDirection:'row'}} onPress={()=>setShow2(false)}>
                <Image source={require('../assets/tienluong.png')} style={{height:'50%',width:'30%',resizeMode:'contain'}}></Image>
                 <Text style={{color:show2?'gray':'#FFA500',fontWeight:'bold'}}>Chi tiêu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:show2?'white':'#E6E6E6',width:'50%',height:50,alignItems:'center',justifyContent:'center',flexDirection:'row'}} onPress={()=>setShow2(true)}>
                <Image source={require('../assets/muasam.png')} style={{height:'50%',width:'30%',resizeMode:'contain'}}></Image>
                <Text style={{color:show2?'#FFA500':'gray',fontWeight:'bold'}}>Thu nhập </Text>
                </TouchableOpacity>
             </View>
             {!show&& (
                <View style={{height:250,width:"100%", alignItems:'center'}}>
                                          <Text style={{fontSize:18, fontWeight:'bold', marginLeft:10}}>BIỂU ĐỒ CHI</Text>
                  <DoughnutChart2></DoughnutChart2>
                </View>
                
              )}
              {show&& (
                <View style={{height:250,width:"100%",alignItems:'center'}}>
                                                            <Text style={{fontSize:18, fontWeight:'bold', marginLeft:10}}>BIỂU ĐỒ THU</Text>

                     <DoughnutChart></DoughnutChart>   
                </View>
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
                              <Text style={{color:'white'}}>Báo cáo </Text>
                          
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
    marginLeft:10,
},
  Text:{
    fontSize:12,
    fontWeight:'bold',
    marginLeft:10,
    width:"30%"
},
  Buttun:{
    width:'50%',
    backgroundColor:'#FFA500',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center'
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