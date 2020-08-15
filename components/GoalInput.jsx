import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Modal} from 'react-native'

function GoalInput(props) {
    const[enteredGoal, setEnteredGoal] = useState('');

    function goalInputHandler(enteredText){
        setEnteredGoal(enteredText);
      }
     
    const addGoalHandler = () => {
        props.onAddGoal.bind(enteredGoal);
        setEnteredGoal('');
    }


    return (
    <Modal visible = {props.visible} animationType ='slide'>
        <View style = {styles.InputContainer}>
        <TextInput 
        placeholder = "Course Goal" 
        style = {styles.input}
        onChangeText={goalInputHandler}
        value={enteredGoal}
        /> 
        <Button title = "CANCEL" color = "red" onPress = {props.onCancel}/>
        <Button title="ADD" onPress = {addGoalHandler}/>
      </View>
     </Modal>
    ); 
}
const styles = StyleSheet.create({
    InputContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
      },
      input: {
        width: '80%', 
        borderColor: 'black', 
        borderWidth: 2, 
        padding: 10,
        marginBottom: 10
      },
      
});
export default GoalInput; 
