import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View,TextInput,Image } from 'react-native';
import { useState } from 'react';

export default function Khac({navigation}) {
  const [hovered, setHovered] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'white',justifyContent:'flex-end',width:'100%',height:50,alignItems:'center',flexDirection:'row'}}>
       
            <Text style={{fontSize:'25',fontWeight:'bold', marginRight:"35%"}}>Khác</Text>
            <Text style={{marginRight:5,color:'#FFA500'}}>Trợ giúp</Text>
        </View>
        <View>
            <TouchableOpacity style={{backgroundColor:hovered?'#FFA500':'white',borderRadius:10,marginTop:50,justifyContent:'flex-start',width:'100%',height:50,alignItems:'center',flexDirection:'row'}} onPress={()=>alert('chưa phát triển chức năng này')} onMouseEnter={() => setHovered(true)}  onMouseLeave={() => setHovered(false)}>
            <Image source={require('../assets/setting.png')} style={{height:'50%',width:'20%',resizeMode:'contain',marginRight:'10'}}></Image>
                <Text style={{fontSize:'25',fontWeight:'bold', marginRight:'40%'}}>Cài đặt cơ bản</Text>
                <Text style={{fontSize:20,fontWeight:'bold'}}>&gt;</Text> 
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={{backgroundColor:hovered1?'#FFA500':'white',borderRadius:10,marginTop:5,justifyContent:'flex-start',width:'100%',height:50,alignItems:'center',flexDirection:'row'}} onPress={()=>alert('chưa phát triển chức năng này')} onMouseEnter={() => setHovered1(true)}  onMouseLeave={() => setHovered1(false)}>
            <Image source={require('../assets/nhapvao.png')} style={{height:'50%',width:'20%',resizeMode:'contain',marginRight:'10'}}></Image>
                <Text style={{fontSize:'25',fontWeight:'bold', marginRight:'35%'}}>Dịch vụ Premium</Text>
                <Text style={{fontSize:20,fontWeight:'bold'}}>&gt;</Text> 
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={{backgroundColor:hovered2?'#FFA500':'white',borderRadius:10,marginTop:5,justifyContent:'flex-start',width:'100%',height:50,alignItems:'center',flexDirection:'row'}} onPress={()=>alert('chưa phát triển chức năng này')} onMouseEnter={() => setHovered2(true)}  onMouseLeave={() => setHovered2(false)}>
            <Image source={require('../assets/favicon.png')} style={{height:'50%',width:'20%',resizeMode:'contain',marginRight:'10'}}></Image>
                <Text style={{fontSize:'25',fontWeight:'bold', marginRight:'11%'}}>Thay đổi biểu tưởng ứng dụng </Text>
                <Text style={{fontSize:20,fontWeight:'bold'}}>&gt;</Text> 
            </TouchableOpacity>
        </View>

        <View style={{width:'100%',height:50,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',bottom:0, position: 'absolute',}}>
            <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}  onPress={()=>navigation.navigate('Menu')} >
         
                              <Image source={require('../assets/home.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Nhập vào </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}   onPress={()=>navigation.navigate('Timkiem')}>
         
                              <Image source={require('../assets/timkiem.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Tìm kiếm </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}   onPress={()=>navigation.navigate('Thongke')}>
         
                              <Image source={require('../assets/thongke.png')} style={styles.Img}></Image>
                              <Text style={{color:'gray'}}>Báo cáo </Text>
                          
            </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: '#FFA500',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}  onPress={()=>alert('Thongke')} >
         
                              <Image source={require('../assets/khac.png')} style={styles.Img}></Image>
                              <Text style={{color:'white'}}>Khác</Text>
                          
            </TouchableOpacity>
           </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
   
  },
  Img:{
    height:'40%',
    width:'100%',
    marginBottom:2,
    resizeMode:'contain'
  },
});