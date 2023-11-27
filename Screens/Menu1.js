import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View,Image, Modal } from 'react-native';
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
export default function Menu1({navigation}) {
  const [value,setValue] = useState(new Date())
  const [click,setClick] = useState(false)
  const clickMouse = () => {
   if(click===false) setClick(true);
   else  setClick(false)

  };
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
  const submitItem = () => {
    if (note && tien > 0 && name && img && name) {
      var i = {};
      i.notice = note;
      i.date = `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
      i.money = tien;
      i.name = name;
      i.image = img;
      i.view = true;
      i.status = show;
      setItem(i);
      
    
      fetch('https://6551ee245c69a779032948e9.mockapi.io/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(i),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setModalVisible(true);
        })
        .catch(error => {
          console.error('Error:', error);
         
        });
    } else {
      setModalVisible1(true)
    }

  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };
  
  useEffect(() => {
    fetch('https://6551ee245c69a779032948e9.mockapi.io/data')
        .then((response) => response.json())
        .then((json) => {
            setData(json)
        })
  }, []);


  
   const [show,Setshow] = useState(false)
   const [tien,Settien] = useState(0)
   const [date,Setdate] = useState(false)
   const [chi,Setchi] = useState(0)
   const [thu,Setthu] = useState(0)
   const[note,SetNote]=useState()
   const[name,SetName]=useState()
   const[img,SetImg]=useState()

   const [chitieu, setChitieu] = useState([
    {
      id: 1,
      name: 'ăn uống',
      image: require('../assets/anuong.png'),
    },
    {
      id: 2,
      name: 'chi tiêu',
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
  ]);
  
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
      <View style={styles.row}>
            <View style={{borderRadius:8,backgroundColor:'#808080',width:'50%',height:30,flexDirection:'row'}}>
             <TouchableOpacity style={{ width:'50%',backgroundColor:show?"#808080":'#FFA500', borderRadius:8,justifyContent:'center',alignItems:'center'}} onPress={()=>Setshow(false)}>
                 <Text style={{color:show?'#FFA500':'white',fontWeight:'bold'}}>Tiền chi</Text>

             </TouchableOpacity>
             <TouchableOpacity style={{ width:'50%',backgroundColor:show?'#FFA500':"#808080", borderRadius:8,justifyContent:'center',alignItems:'center'}} onPress={()=>Setshow(true)}>
             <Text style={{color:show?'white':'#FFA500',fontWeight:'bold'}}>Tiền thu</Text>
             </TouchableOpacity>
            </View>
           
         </View>
       
          {!show&&(
            <View style={{flexDirection:'column'}} >

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
                  <TextInput style={{height:30,width:300, backgroundColor:'#F2F3D6', borderWidth:1,borderRadius:10,marginLeft:10, paddingLeft:10}}  onChangeText={(text)=>{SetNote(text)}} placeholder='Chưa nhập vào'></TextInput>
                </View>
                <View style={{ height:40,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={styles.Text}>Tiền Chi </Text>
                  <TextInput style={{height:30,width:225, backgroundColor:'#F2F3D6', borderWidth:1,borderRadius:10,marginLeft:7,paddingLeft:10}} value={tien}  onChangeText={(text)=>{ const numericValue = parseFloat(text); ;Settien(isNaN(numericValue) ? 0 : numericValue)}}></TextInput>
                  <Text style={{fontSize:16, marginLeft:5}}>₫</Text>
                 </View> 
                 <Text style={styles.Text}>Danh mục </Text>
                 <View style={styles.List}> 
                  {chitieu.map((item, index) => (
                      <TouchableOpacity style={{backgroundColor:'white',height:"33%",width:'33%',justifyContent:'center',alignItems:'center'}} key={index}  onMouseEnter={() => setHoveredItemId(item.id)} onPress={()=>{Setchi(item.id);SetName(item.name);SetImg(item.image)}} onMouseLeave={() => setHoveredItemId(chi)}>
                        <View style={{backgroundColor: hoveredItemId === item.id ? '#FFA500':'white',justifyContent:'center',flexDirection:'column',alignItems:'center',height:'100%',width:'100%'}} >
                            <Image source={item.image} style={styles.Img}></Image>
                            <Text style={{color: hoveredItemId === item.id ? 'white':'gray'}}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                 </View>
                 <View style={{justifyContent:"center",alignItems:"center"}}>
                  <TouchableOpacity style={{borderRadius:25,backgroundColor:'#FFA500',width:'80%',height:50,justifyContent:"center",alignItems:"center"}} onPress={()=>{submitItem()}}>
                    <Text style={{color:'white'}}> NHẬP KHOẢN CHI</Text> </TouchableOpacity>
                 </View>

            </View>
         
           )}
           {show&&(
            <View>
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
                  <TextInput style={{height:30,width:300, backgroundColor:'#F2F3D6', borderWidth:1,borderRadius:10,marginLeft:10, paddingLeft:10}} placeholder='Chưa nhập vào'  onChangeText={(text)=>{SetNote(text)}}></TextInput>
                </View>
                <View style={{ height:40,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={styles.Text}>Tiền Thu</Text>
                  <TextInput style={{height:30,width:226, backgroundColor:'#F2F3D6', borderWidth:1,borderRadius:10,marginLeft:6,paddingLeft:10}} value={tien}  onChangeText={(text)=>{ const numericValue = parseFloat(text); ;Settien(isNaN(numericValue) ? 0 : numericValue)}}></TextInput>
                  <Text style={{fontSize:16, marginLeft:5}}>₫</Text>
                 </View> 
                 <Text style={styles.Text}>Danh mục </Text>
                 <View style={styles.List}> 
                 {thuNhap.map((item, index) => (
                      <TouchableOpacity style={{backgroundColor: hoveredItemId === item.id ? '#FFA500':'white',height:"33%",width:'33%',justifyContent:'center',alignItems:'center'}} key={index}  onMouseEnter={() => setHoveredItemId(item.id)} onPress={()=>{Setthu(item.id);SetName(item.name);SetImg(item.image)}}  onMouseLeave={() => setHoveredItemId(thu)}>
                        <View style={{justifyContent:'center',flexDirection:'column',alignItems:'center',height:'100%',width:'100%'}} >
                            <Image source={item.image} style={styles.Img}></Image>
                            <Text style={{color: hoveredItemId === item.id ? 'white':'gray'}}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}

                 </View>
                 <View style={{justifyContent:"center",alignItems:"center"}}>
                  <TouchableOpacity style={{borderRadius:25,backgroundColor:'#FFA500',width:'80%',height:50,justifyContent:"center",alignItems:"center"}} onPress={()=>{submitItem()}}>
                    <Text style={{color:'white'}}> NHẬP KHOẢN THU</Text> </TouchableOpacity>
                 </View>
                 
             
            </View>
         
           )}
           <View style={{width:'100%',height:50,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',bottom:0, position: 'absolute',}}>
            <TouchableOpacity style={{backgroundColor: '#FFA500',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}  >
         
                              <Image source={require('../assets/home.png')} style={styles.Img}></Image>
                              <Text style={{color:'white'}}>Nhập vào </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}  onPress={()=>navigation.navigate('Timkiem')}>
         
                              <Image source={require('../assets/timkiem.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Tìm kiếm </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}} onPress={()=>navigation.navigate('Thongke')} >
         
                              <Image source={require('../assets/thongke.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Thống kê </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}  onPress={()=>navigation.navigate('Khac')}>
         
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
            <Text style={styles.modalText}>Thêm thành công</Text>
            <Button title="Đóng" onPress={() => closeModal()} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Lỗi nhập liệu</Text>
            <Button title="Đóng" onPress={() => closeModal1()} />
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
  row:{
    flexDirection:'row',
    backgroundColor:'#E6E6E6',
    height:'50px',
    justifyContent:'center',
    alignItems:'center',
  },
  Buttun:{
   
  },
  Text:{
        fontSize:16,
        fontWeight:'bold',
        marginLeft:10,
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
  Input:{
    backgroundColor:'#E6E6E6',
    height:'80%',
    borderRadius:8, 
    width:250,
    marginRight:20
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
    height:'40%',
    width:'100%',
    marginBottom:2,
    resizeMode:'contain'
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
