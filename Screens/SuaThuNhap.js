import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Image } from 'react-native';


export default function Sua2({navigation}) {
  const [tien,Settien] = useState(0)
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
              <View style={{backgroundColor:'white',justifyContent:'center',width:'100%',height:50,alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:'25',fontWeight:'bold'}}>SỬA THU NHẬP </Text>
                </View>
              <View style={{ height:40,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                 <Text style={styles.Text}>Ngày</Text>
                 <TouchableOpacity style={{marginLeft:10,marginRight:20}} > 
                     <Text style={{fontSize:20,fontWeight:'bold'}}>&lt;</Text> 
                 </TouchableOpacity>
                  <TextInput style={styles.Input} placeholder=" YYYY-MM-DD" ></TextInput>
                  <TouchableOpacity style={{marginLeft:10,marginRight:20}} > 
                     <Text style={{fontSize:20,fontWeight:'bold'}}>&gt;</Text> 
                 </TouchableOpacity>
               </View>
                <View style={{ height:40,width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={styles.Text}>Ghi chú </Text>
                  <TextInput style={{borderWidth:1,borderColor:'#808080',backgroundColor:'white',height:'90%', marginLeft:10,width:300}} placeholder='Chưa nhập vào'></TextInput>
                </View>

                <View style={{ height:40,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={styles.Text}>Tiền Thu </Text>
                  <TextInput style={{borderWidth:1,borderColor:'#808080',backgroundColor:'white',height:'90%', marginLeft:10,width:250}} value={tien} onChangeText={()=>Settien}></TextInput>
                  <Text>đ</Text>
                 </View> 
                 <Text style={styles.Text}>Danh mục </Text>
                 <View style={styles.List}> 
                 {thuNhap.map((item, index) => (
                      <TouchableOpacity style={{backgroundColor: hoveredItemId === item.id ? '#FFA500':'white',height:"33%",width:'33%',justifyContent:'center',alignItems:'center'}} key={index}  onMouseEnter={() => setHoveredItemId(item.id)}  onMouseLeave={() => setHoveredItemId(null)}>
                        <View style={{justifyContent:'center',flexDirection:'column',alignItems:'center',height:'100%'}} >
                            <Image source={item.image} style={styles.Img}></Image>
                            <Text style={{color: hoveredItemId === item.id ? 'white':'gray'}}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                 </View>
                 <View style={{justifyContent:"center",alignItems:"center"}}>
                  <TouchableOpacity style={{borderRadius:25,backgroundColor:'#FFA500',width:'80%',height:50,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:'white'}}> SỬA KHOẢN THU </Text> </TouchableOpacity>
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

});
