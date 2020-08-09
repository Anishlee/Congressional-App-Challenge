import { StatusBar, } from 'expo-status-bar';
import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text, View, 
  TextInput, 
  Button, 
  ScrollView, 
  FlatList
} from 'react-native';

import GoalItem from './components/GoalItem';

export default function App() {
  const [enteredGoal,setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  function goalInputHandler(enteredText){
    setEnteredGoal(enteredText);
  }
  function addGoalHandler(){
    setCourseGoals(currentGoals => [
      ...currentGoals,
      {id: Math.random().toString(), value: enteredGoal}
    ]);
  } 
  return (
    <View style = {styles.screen}>
      <StatusBar style="auto" />
      <View style = {styles.InputContainer}>
        <TextInput 
        placeholder = "Course Goal" 
        style = {styles.input}
        onChangeText={goalInputHandler}
        value={enteredGoal}
        /> 
        <Button title="ADD" onPress = {addGoalHandler}/>
      </View>
      <FlatList 
      keyExtractor={(item, index) => item.id}
      data ={courseGoals} 
      renderItem={itemData => <GoalItem title = {itemData.item.value}/>} 
      
      />
        

    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    padding: 50 
  },
  InputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  input: {
    width: '80%', 
    borderColor: 'black', 
    borderWidth: 2, 
    padding: 10
  },
  
});