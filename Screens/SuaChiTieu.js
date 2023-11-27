import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Image, Button,Modal } from 'react-native';
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function Sua({navigation, route}) {
 
  const {item} = route.params;
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
        status: false,
      };
  
      // Cập nhật dữ liệu trên máy chủ bằng phương thức PUT
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
          setModalVisible(true);
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
  const [chi, setChi] = useState(0);  // Bạn có thể cần sử dụng state để lưu trữ giá trị của chi


  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  

  const [chitieu, setChitieu] = useState([
    {
      id: 1,
      name: 'ăn uống',
      image: require('../assets/anuong.png'),
    },
    {
      id: 2,
      name: 'chi tiêu ',
      image: require('../assets/muasam.png'),
    },
    {
      id: 3,
      name: 'quần áo',
      image: require('../assets/quanao.png'),
    },
    {
      id: 4,
      name: 'mỹ phẩm',
      image: require('../assets/mypham.png'),
    },
    {
      id: 5,
      name: 'liên lạc',
      image: require('../assets/lienlac.png'),
    },
    {
      id: 6,
      name: 'y tế',
      image: require('../assets/suckhoe.png'),
    },
    {
      id: 7,
      name: 'phí giao lưu',
      image: require('../assets/phigiaoluu.png'),
    },
    {
      id: 8,
      name: 'đi lại',
      image: require('../assets/dilai.png'),
    },
    {
      id: 9,
      name: 'chi phí khác',
      image: require('../assets/khac.png'),
    },
    
  ])
  const [hoveredItemId, setHoveredItemId] = useState(null);
  return (
    <View style={styles.container}>
       <View >
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
             <View style={{ height:40,width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={styles.Text}>Ghi chú </Text>
                  <TextInput style={{height:30,width:300, backgroundColor:'#F2F3D6', borderWidth:1,borderRadius:10,marginLeft:10, paddingLeft:10}}  onChangeText={(text)=>{setNote(text)} } value={note} placeholder='Chưa nhập vào'></TextInput>
                </View>
                <View style={{ height:40,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={styles.Text}>Tiền Chi </Text>
                  <TextInput style={{height:30,width:225, backgroundColor:'#F2F3D6', borderWidth:1,borderRadius:10,marginLeft:7,paddingLeft:10}} value={tien}  onChangeText={(text)=>{ const numericValue = parseFloat(text); ;Settien(isNaN(numericValue) ? 0 : numericValue)}}></TextInput>
                  <Text style={{fontSize:16, marginLeft:5}}>₫</Text>
                 </View>  
              <Text style={styles.Text}>Danh mục </Text>
              <View style={styles.List}> 
               {chitieu.map((item, index) => (
                   <TouchableOpacity style={{backgroundColor:'white',height:"33%",width:'33%',justifyContent:'center',alignItems:'center'}} key={index}  onMouseEnter={() => setHoveredItemId(item.id)} onPress={()=>{setChi(item.id);setName(item.name);setImg(item.image)}} onMouseLeave={() => setHoveredItemId(chi)}>
                     <View style={{backgroundColor: hoveredItemId === item.id ? '#FFA500':'white',justifyContent:'center',flexDirection:'column',alignItems:'center',height:'100%',width:'100%'}} >
                         <Image source={item.image} style={styles.Img}></Image>
                         <Text style={{color: hoveredItemId === item.id ? 'white':'gray'}}>{item.name}</Text>
                     </View>
                    </TouchableOpacity>
                  ))}
              </View>
              <View style={{justifyContent:"center",alignItems:"center"}}>
               <TouchableOpacity style={{borderRadius:25,backgroundColor:'#FFA500',width:'80%',height:50,justifyContent:"center",alignItems:"center", marginTop:50}} onPress={()=>{submitItem()}}>
                 <Text style={{color:'white'}}>SỬA KHOẢN CHI</Text> </TouchableOpacity>
              </View>
                 
             
            </View>

            <View style={{width:'100%',height:50,justifyContent:'flex-start',alignItems:'flex-end',flexDirection:'row',bottom:0, position:'absolute'}}>
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
                                <Text style={{color:'gray'}}>Thống kê </Text>
                            
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}   onPress={()=>navigation.navigate('Khac')}>
          
                                <Image source={require('../assets/khac.png')} style={styles.Img}></Image>
                                <Text style={{color:'gray'}}>Khác</Text>
                            
              </TouchableOpacity>
            </View>
           <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sửa thành công</Text>
            <Button title="Đóng" onPress={() => {closeModal();navigation.navigate('Timkiem')}} />
          </View>
        </View>
      </Modal>
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
Text2:{
  fontSize:16,
  fontWeight:'bold',

},
Textheader:{
  fontSize:16,
  fontWeight:'bold',
  textAlign:'center',
  alignSelf:'center',
  textAlignVertical:"center",
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
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
  width: 0,
  height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold'
}
});
