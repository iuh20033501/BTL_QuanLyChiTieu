import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Image } from 'react-native';
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function Sua2({navigation, route}) {
   const { item } = route.params;
   const [click,setClick] = useState(false)
   const clickMouse = () => {
    if(click===false) setClick(true);
    else  setClick(false)
 
   };
   const [data, setData] = useState(route.params.item);
   useEffect(() => {
   setData(route.params.item);
 }, []);
   const submitItem = () => {
     if (note && tien > 0 && name && img) {
       const updatedItem = {
         notice: note,
         date: `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`,
         money: tien,
         name: name,
         image: img,
         view: true,
         status: true,
       };
   
       fetch(`https://6551ee245c69a779032948e9.mockapi.io/data/${item.id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(updatedItem),
       })
         .then(response => {
           if (!response.ok) {
             throw new Error(`Máy chủ trả lại trạng thái: ${response.status}`);
           }
           return response.json();
         })
         .then(data => {
           console.log('Thành công:', data);
           alert('Sửa thành công');
         })
         .catch(error => {
           console.error('Lỗi:', error.message);
           alert('Lỗi khi sửa');
         });
     } else {
       alert('Lỗi nhập liệu');
     }
   };
   
   const [value, setValue] = useState(new Date());
   const [note, setNote] = useState(data.notice);
   const [tien, setTien] = useState(data.money);
   const [name, setName] = useState(data.name);
   const [img, setImg] = useState(data.image);
   const [thu, setThu] = useState(0);  

  const [thuNhap, setThuNhap] = useState([
    {
      id: 1,
      name: 'Tiền lương',
      image: require('../assets/tienluong.png'),
    },
    {
      id: 2,
      name: 'Thu nhập tạm...',
      image: require('../assets/thunhaptamthoi.png'),
    },
    {
      id: 3,
      name: 'Tiền phụ cấp',
      image: require('../assets/tienphucap.png'),
    },
    {
      id: 4,
      name: 'Tiền thưởng',
      image: require('../assets/tienthuong.png'),
    },
    {
      id: 5,
      name: 'Thu nhập phụ',
      image: require('../assets/thunhapphu.png'),
    },
    {
      id: 6,
      name: 'Đầu tư',
      image: require('../assets/dautu.png'),
    },
    {
      id: 7,
      name: 'Khác',
      image: require('../assets/khac.png'),
    },
  ])
  const [hoveredItemId, setHoveredItemId] = useState(null);
  return (
    <View style={styles.container}>
       <View >
       
       <View style={{flexDirection:'row', height: click ? 320 : 40 ,justifyContent:'flex-start',alignItems:'center',marginLeft:20}}>
           
           <Text style={styles.Text}>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</Text>
           <TouchableOpacity onPress={clickMouse} style={styles.Buttun2}>
           <Text style={styles.Text2}>{click ? 'OK' : 'DATE'}</Text>
             </TouchableOpacity>
             </View>
             {click&&( <DateTimePicker
          onChange={setValue}
          value={value}
          isCalendarOpen
          onCalendarClose={clickMouse}
     />)}
             <View style={{ height:40,width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
               <Text style={styles.Text}>Ghi chú </Text>
               <TextInput style={{borderWidth:1,borderColor:'#808080',backgroundColor:'white',height:'90%', marginLeft:10,width:300}}  onChangeText={(text)=>{setNote(text)}} placeholder='Chưa nhập vào' value={note}></TextInput>
             </View>
             <View style={{ height:40,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
               <Text style={styles.Text}>Tiền Chi </Text>
               <TextInput style={{borderWidth:1,borderColor:'#808080',backgroundColor:'white',height:'90%', marginLeft:10,width:250}} value={tien}  onChangeText={(text)=>{ const numericValue = parseFloat(text); setTien(isNaN(numericValue) ? 0 : numericValue)}}></TextInput>
               <Text>đ</Text>
              </View> 
              <Text style={styles.Text}>Danh mục </Text>
              <View style={styles.List}> 
               {thuNhap.map((item, index) => (
                   <TouchableOpacity style={{backgroundColor:'white',height:"33%",width:'33%',justifyContent:'center',alignItems:'center'}} key={index}  onMouseEnter={() => setHoveredItemId(item.id)} onPress={()=>{setThu(item.id);setName(item.name);setImg(item.image)}} onMouseLeave={() => setHoveredItemId(thu)}>
                     <View style={{backgroundColor: hoveredItemId === item.id ? '#FFA500':'white',justifyContent:'center',flexDirection:'column',alignItems:'center',height:'100%',width:'100%'}} >
                         <Image source={item.image} style={styles.Img}></Image>
                         <Text style={{color: hoveredItemId === item.id ? 'white':'gray'}}>{item.name}</Text>
                     </View>
                   </TouchableOpacity>
                 ))}
              </View>
              <View style={{justifyContent:"center",alignItems:"center"}}>
               <TouchableOpacity style={{borderRadius:25,backgroundColor:'#FFA500',width:'80%',height:50,justifyContent:"center",alignItems:"center"}} onPress={()=>{submitItem()}}>
                 <Text style={{color:'white'}}>SỬA KHOẢN CHI</Text> </TouchableOpacity>
              </View>
                 
             
            </View>
            <View style={{width:'100%',height:50,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',bottom:0, position: 'absolute',}}>
            <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}   onPress={()=>navigation.navigate('Menu')}>
         
                              <Image source={require('../assets/home.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Nhập vào </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: '#FFA500',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}  >
         
                              <Image source={require('../assets/timkiem.png')} style={styles.Img}></Image>
                              <Text style={{color:'white'}}>Tìm kiếm </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}  onPress={()=>navigation.navigate('Thongke')} >
         
                              <Image source={require('../assets/thongke.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Báo cáo </Text>
                          
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
  Text:{
    fontSize:16,
    fontWeight:'bold',
    marginLeft:10,
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
  justifyContent:'flex-start',
  marginLeft:'5%',
  flexWrap:'wrap',
  flexDirection:'row'

},
Img:{
  height:'60%',
  width:'100%',
  marginBottom:5,
  resizeMode:'contain'
},
Text2:{
  fontSize:16,
  fontWeight:'bold',

},
Buttun2:{
  width:'100',
  backgroundColor:'#FFA500',
  borderRadius:8,
  justifyContent:'center',
  alignItems:'center',
  marginLeft:150
},
});
