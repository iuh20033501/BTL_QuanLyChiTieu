import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { StyleSheet, Text, TextInput, TouchableOpacity,View} from 'react-native';

export default function Datepicker({navigation}) {
    const [value,setValue] = useState(new Date())
    const [click,setClick] = useState(false)
    const handleDateTimePickerPress = () => {
        setClick(true);
        console.log(click)
      };
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={handleDateTimePickerPress}>
            <DateTimePicker  style={styles.dateTimePicker} onChange={setValue} value={value} onCalendarOpen={click} ></DateTimePicker>
           {/* <TouchableOpacity style={styles.btnDone} onPress={() =>navigation.navigate('Menu1') }><Text>Done</Text></TouchableOpacity>  */}
           </TouchableOpacity>
        </View>         
    )
 }
    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        btnDone:{
            width:50,
            height:50,
        },
        dateTimePicker: {
            // Các styles cho DateTimePicker
            zIndex: 1, // Đảm bảo DateTimePicker nằm trên cùng
          },
    })
