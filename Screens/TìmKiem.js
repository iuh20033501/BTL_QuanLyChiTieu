import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TimKiem({navigation}) {
  const[nhap,setNhap]= useState(2);
  const[chi,setChi]= useState(0);
 
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',width:'100%',height:80,alignItems:'center'}}>
            <Text style={{fontSize:'55',fontWeight:'bold', }}>Tìm kiếm (toàn thời gian)</Text>
        </View>
        <View style={{justifyContent:'flex-start',alignItems:'center',height:50,width:'100%',borderColor:'gray',flexDirection:'row'}}> 
          
          <TextInput style={styles.Input} placeholder="  Tìm kiếm" ></TextInput>
          
          <TouchableOpacity style={{width:'15%',height:'90%',borderRadius:8,marginLeft:5,alignItems:'center',justifyContent:'center',backgroundColor:'#FFA500'}}>
                <Image source={require('../assets/timkiem.png')} style={{resizeMode:'contain',height:'80%',width:'80%'}}></Image>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent:'flex-start',alignItems:'center',height:100,width:'100%',flexDirection:'row'}}> 
            
                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%',width:'33%'}}>
                <Text style={{fontSize:'10',color:'gray'}}>Thu nhập</Text>
                <Text style={{fontSize:'20',color:'blue',fontWeight:'bold'}}>{nhap}đ</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%',width:'33%'}}>
                <Text style={{fontSize:'10',color:'gray'}}>Chi tiêu</Text>
                <Text style={{fontSize:'20',color:'red',fontWeight:'bold'}}>{chi}đ</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%',width:'33%'}}>
                <Text style={{fontSize:'10',color:'gray'}}>Tổng</Text>
                <Text style={{fontSize:'20',color:'#FFA500',fontWeight:'bold'}}>+{nhap- chi}đ</Text>
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
  Input:{
    backgroundColor:'#E6E6E6',
    height:'90%',
    borderRadius:8, 
    width:"80%",
    marginLeft:10
    
  },
  Img:{
    height:'40%',
    width:'100%',
    marginBottom:2,
    resizeMode:'contain'
  },
});
