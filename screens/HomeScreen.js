import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import db from '../config'

import MyHeader from '../components/MyHeader';

export default class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      requestedItemsList: []
    }
    this.requestRef = null
  }

  getrequestedItemsList = () => {
    this.requestRef = db.collection("exchange_requests")
      .onSnapshot((snapshot) => {
        var requestedItemsList = snapshot.docs.map(document => document.data());
        this.setState({
          requestedItemsList: requestedItemsList
        });

      })
  }

  componentDidMount() {
    this.getrequestedItemsList()
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.product_description}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("RecieverDetails", { "details": item })
            }}
          >
            <Text style={{ color: '#ffff' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    )

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Exchange Requests" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {
            this.state.requestedItemsList.length === 0
              ? (
                <View style={styles.subContainer}>
                  <Text style={{ fontSize: 15 }}>List Of All Requested Items Will Appear Here</Text>
                </View>
              )
              : (
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.requestedItemsList}
                  renderItem={this.renderItem}
                />
              )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0e5da2",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    }
  }
})