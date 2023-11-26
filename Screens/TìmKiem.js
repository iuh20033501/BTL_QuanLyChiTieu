  import { faL } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
  import { useState, useEffect } from 'react';
  import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal,Button} from 'react-native';
import Sua from './SuaChiTieu';

  export default function TimKiem({navigation}) {
    const[nhap,setNhap]= useState(null);
    const[data,setData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const[click,setClick] = useState(false);
    const [deletedData, setDeletedData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [fetchingData, setFetchingData] = useState(false);


    useEffect(() => {
      fetch('https://6551ee245c69a779032948e9.mockapi.io/data')
        .then((response) => response.json())
        .then((json) => {
          // Lọc chỉ những mục có thuộc tính view là true
          const filteredData = json.filter((item) => item.view === true);
          setData(filteredData);
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu:', error.message);
        });
    }, [click]);

    const getStatusText = (status) => {
      return status ? 'Thu nhập' : 'Chi tiêu';
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

      const handleSearch = () => {
      
        if (!nhap) {
          setSearchResults(data); // Nếu ô tìm kiếm trống, hiển thị toàn bộ dữ liệu
        } else {
          // Sử dụng filter để tìm kiếm gần đúng theo tên
          const results = data.filter((item) =>
            item.name.toLowerCase().includes(nhap.toLowerCase())
          );
          setSearchResults(results);
        }
      };

      const handleDeleteItem = async (id) => {
        try {
          const response = await fetch(`https://6551ee245c69a779032948e9.mockapi.io/data/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({view: false }), // Gửi status: false để đánh dấu là đã xóa
          });
    
          if (!response.ok) {
            throw new Error('Không thể cập nhật trạng thái xóa');
          }
    
          // Cập nhật state để kích hoạt render lại component
          setFetchingData(true);
          setModalVisible(true);
        } catch (error) {
          console.error('Lỗi khi xóa mục:', error.message);
        }
      };
      

      const closeModal = () => {
        setModalVisible(false);
      };
  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://6551ee245c69a779032948e9.mockapi.io/data');
      if (!response.ok) {
        throw new Error('Lỗi khi fetch dữ liệu');
      }
      const json = await response.json();
     
      const filteredData = json.filter((item) => item.view === true && !deletedData.includes(item.id));
      setData(filteredData);
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu:', error.message);
    } finally {
      setFetchingData(false);
    }
  };

  if (fetchingData) {
    fetchData();
  }
}, [fetchingData, deletedData]);

const handleEditItem = (item) => {
  if (item.status === false) {
    navigation.navigate('Sua', {item});
  } else {
    navigation.navigate('Sua2', {item});
  }
};

    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',width:'100%',height:80,alignItems:'center'}}>
              <Text style={{fontSize:'55',fontWeight:'bold', }}>Tìm kiếm (toàn thời gian)</Text>
          </View>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center', height: 50, width: '100%', borderColor: 'gray', flexDirection: 'row' }}>
          <TextInput
            style={styles.Input}
            placeholder="  Tìm kiếm"
            onChangeText={(text) => setNhap(text)}
          />
          <TouchableOpacity
            style={{
              width: '15%', height: '90%', borderRadius: 8, marginLeft: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFA500'
            }}
            onPress={() => {
              handleSearch(); 
            }}
          >
            <Image source={require('../assets/timkiem.png')} style={{ resizeMode: 'contain', height: '80%', width: '80%' }} />
          </TouchableOpacity>
        </View>
          <View style={{justifyContent:'flex-start',alignItems:'center',height:100,width:'100%',flexDirection:'row'}}> 
              
                  <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%',width:'33%'}}>
                  <Text style={{fontSize:'10',color:'gray'}}>Thu nhập</Text>
                  <Text style={{fontSize:'20',color:'blue',fontWeight:'bold'}}>{totalThu}đ</Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%',width:'33%'}}>
                  <Text style={{fontSize:'10',color:'gray'}}>Chi tiêu</Text>
                  <Text style={{fontSize:'20',color:'red',fontWeight:'bold'}}>{totalChi}đ</Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100%',width:'33%'}}>
                  <Text style={{fontSize:'10',color:'gray'}}>Chênh lệch</Text>
                  <Text style={{fontSize:'20',color:'#FFA500',fontWeight:'bold'}}>+{chenhLech}đ</Text>
                  </View>
          </View>
          <View style ={{bottom:0, position:'relative'}}>
          <ScrollView style={{width:'100%',height:380}}>
            {searchResults.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.Textbox}>
                    <Text key={index}>Tên: {item.name}</Text>
                    <Text key={index}>Ghi chú: {item.notice}</Text>
                    <Text key={index} style={{ position: 'absolute', alignSelf: 'flex-end' }}>Giá: {item.money}đ</Text>
                    <Text  key={index} style={{ position: 'absolute', alignSelf: 'flex-end', marginTop: 20 }}>Loại: {getStatusText(item.status)}</Text>
                    <TouchableOpacity style={{ width:'10%' ,borderWidth:1, backgroundColor:'white'}} onPress={() => handleDeleteItem(item.id)}>
                    <Text  style={{ color: 'red', alignSelf:'center' }}>Xóa</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width:'10%' ,borderWidth:1, backgroundColor:'white', position: 'absolute', alignSelf: 'flex-end', marginTop:40}} onPress={() => handleEditItem(item)}>
                    <Text Text  style={{ color: 'green', alignSelf:'center'}}>Sửa</Text> 
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView> 
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
                                <Text style={{color:'gray'}}>Báo cáo </Text>
                            
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: 'white',height:"100%",width:'25%',justifyContent:'center',flexDirection:'column',alignItems:'center',borderRadius:5}}   onPress={()=>navigation.navigate('Khac')}>
          
                                <Image source={require('../assets/khac.png')} style={styles.Img}></Image>
                                <Text style={{color:'gray'}}>Khác</Text>
                            
              </TouchableOpacity>
            </View>
             {/* Modal thông báo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Xóa thành công!</Text>
            <Button title="Đóng" onPress={() => {closeModal(),handleSearch()}} />
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
    Textbox:{
      fontSize: 14,
      padding:10,
      borderRadius: 20,
      borderWidth: 1,
      marginBottom: 5,
      backgroundColor:'#F3d8f3'
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
