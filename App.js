  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View } from 'react-native';
  import Menu1 from './Screens/Menu1';
  import ThongKe from './Screens/ThongKe';
  import Khac from './Screens/Khac';
  import Sua from './Screens/SuaChiTieu';
  import TimKiem from './Screens/TìmKiem';
  import Sua2 from './Screens/SuaThuNhap';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { NavigationContainer } from '@react-navigation/native';
  import Datepicker from './Screens/Datepicker';
 import DoughnutChart from './Screens/ChartChi';
 import { useState,useEffect } from 'react';

  export default function App() {
     const stack = createNativeStackNavigator();
     const [data, setData] = useState([]);
     
  
    return (
      // <View style={styles.container}>
      //   {/* <TEST></TEST> */}
      //   {/* <DoughnutChart></DoughnutChart> */}
      //   {/* <Datepicker></Datepicker> */}
      // {/* <Menu1></Menu1> */}
      //   <ThongKe></ThongKe>
      //   {/* <Khac></Khac> */}
      //   {/* <Sua></Sua> */}
      //   {/* <Sua2></Sua2> */}
      //   {/* <TimKiem></TimKiem> */}
        
        
      // </View>
      <NavigationContainer>
        <stack.Navigator initialRouteName='home' >
          <stack.Screen name= 'Menu' component={Menu1}  options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name= 'Thongke' component={ThongKe}  options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name= 'Timkiem' component={TimKiem}  options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name= 'Sua2' component={Sua2}  options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name= 'Sua' component={Sua}  options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name= 'Khac' component={Khac}  options={{ headerShown: false }}></stack.Screen>
        </stack.Navigator>
      </NavigationContainer>

    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    
    },
  });
