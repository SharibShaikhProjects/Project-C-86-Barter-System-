import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';
import db from '../config'

import NotificationScreen from '../screens/notificationscreen';

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  getNumberOfUnreadNotifications() {
    db.collection('all_notifications').where('notification_status', '==', "unread")
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => doc.data())
        this.setState({
          value: unreadNotifications.length
        })
      })
  }

  componentDidMount() {
    this.getNumberOfUnreadNotifications()
  }
  BellIcon = () => {
    return (
      <View>
        <Icon name='bell'
          type='font-awesome'
          color='white' size={25}
          onPress={() => this.props.navigation.navigate('Notifications')} />
        <Badge
          value={this.state.value}
          containerStyle={{ position: "absolute", top: -4, right: -4 }} />

      </View>


    )
  }

  render() {
    return (
      <Header containerStyle={{
        backgroundColor: '#0e5da2'
      }}


        leftComponent={<Icon
          name='bars'
          type='font-awesome'
          color='white'
          onPress={() => this.props.navigation.toggleDrawer()}
        />}

        centerComponent={{
          text: this.props.title,
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: "bold",
            justifyContent: 'center',
            alignItems: 'center'
          }
        }}

        rightComponent={<this.BellIcon {...this.props} />
        }



      />
    );
  }
}



















