import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ClassName extends React.Component {
    
render(){
    return (
        <View style={styles.container}>
          <Text>My Text</Text>
      
        </View>
      );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
