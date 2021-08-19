import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import firebase from "firebase";
import db from "../config";

import MyHeader from "../components/MyHeader";

export default class AddItemRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      reasonToRequest: "",
      userId: firebase.auth().currentUser.email,
      requestId: "",
      IsBarterRequestActive: "",
      requestedBarter: "",
      barterStatus: "",
      docId: ""
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (itemName, reasonToRequest) => {
    var userId = this.state.userId;
    var requestId = this.createUniqueId();
    db.collection("exchange_requests").add({
      "user_id": userId,
      "item_name": itemName,
      "product_description": reasonToRequest,
      "barter_id": requestId,
      "barter_status": "Requested",
      "date": firebase.firestore.FieldValue.serverTimestamp(),
    })

    this.getBarterRequest()
    db.collection('users').where("username", "==", userId).get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            IsBarterRequestActive: true
          })
        })
      })

    this.setState({
      itemName: "",
      reasonToRequest: "",
      requestId: requestId
    });

    return Alert.alert("Exchange Request Submitted Successfully");
  }

  receivedItem = (itemName) => {
    var userId = this.state.userId
    var requestId = this.state.requestId
    db.collection('received_item').add({
      "user_id": userId,
      "item_name": itemName,
      "request_id": requestId,
      "barterStatus": "Received",

    })
  }

  getIsBarterRequestActive() {
    db.collection('users')
      .where('username', '==', this.state.userId)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            IsBarterRequestActive: doc.data().IsBarterRequestActive,
            userDocId: doc.id
          })
        })
      })
  }


  getBarterRequest = () => {
    // getting the requested book
    var barterRequest = db.collection('exchange_requests')
      .where('user_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().barter_status !== "Received") {
            this.setState({
              requestId: doc.data().barter_id,
              requestedBarter: doc.data().item_name,
              barterStatus: doc.data().barter_status,
              docId: doc.id
            })
          }
        })
      })
  }

  componentDidMount() {
    //this.BarterRequest()
    this.getIsBarterRequestActive()


  }

  updateBarterRequestStatus = () => {
    //updating the book status after receiving the book
    /*db.collection('exchange_requests').doc(this.state.docId)
      .update({
        barter_status: 'Received'
      })*/
    db.collection('users').where('username', '==', this.state.userId).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //updating the doc
          db.collection('users').doc(doc.id).update({
            IsBarterRequestActive: false
          })
        })
      })
  }



  render() {


    if (this.state.IsBarterRequestActive === true) {
      return (

        // Status screen
        <View style={{ flex: 1 }}>
          <MyHeader title="Request A Item" navigation={this.props.navigation} />

          <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
            <View style={{ width: 350, borderColor: "#0e5da2", backgroundColor: '#0e5da2', borderWidth: 3, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white' }}>Product Name</Text>
              <Text style={{ color: 'white' }}>{this.state.requestedBarter}</Text>
            </View>
            <View style={{ borderColor: "#0e5da2", backgroundColor: '#0e5da2', borderWidth: 3, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white' }}>Product Status </Text>

              <Text style={{ color: 'white' }}>{this.state.barterStatus}</Text>
            </View>

            <TouchableOpacity style={{
              borderWidth: 1, borderColor: '#0e5da2', backgroundColor: "#0e5da2", width: 300, alignSelf: 'center', alignItems: 'center', height: 40, marginTop: 30, borderRadius: 10, justifyContent: 'center'
            }}
              onPress={() => {

                this.updateBarterRequestStatus();
                //this.receivedItem(this.state.requestedBarter)
              }}>
              <Text style={{ color: 'white' }}>I Have Recieved The Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else {
      return (

        <View style={styles.container}>

          <MyHeader title="Request Exchange" />
          <KeyboardAvoidingView style={styles.keyBoardStyle}>
            <TextInput
              style={styles.formtextinput}
              placeholder="Name Of Item"
              onChangeText={(text) => {
                this.setState({
                  itemName: text,
                });
              }}
              value={this.state.itemName}
            />

            <TextInput
              style={styles.formdescriptioninput}
              placeholder="Description"
              multiline={true}
              numberOfLines={8}
              onChangeText={(text) => {
                this.setState({
                  reasonToRequest: text,
                });
              }}
              value={this.state.reasonToRequest}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addRequest(this.state.itemName, this.state.reasonToRequest);
              }}
            >
              <Text style={styles.requesttext}>Request Exchange</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formtextinput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#0e5da2",
    borderRadius: 10,
    borderWidth: 1.5,
    marginTop: 20,
    padding: 10,
  },

  formdescriptioninput: {
    width: "75%",
    height: 75,
    alignSelf: "center",
    borderColor: "#0e5da2",
    borderRadius: 10,
    borderWidth: 1.5,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: 200,
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#0e5da2",

  },
  requesttext: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  keyBoardStyle: {
    flex: 0.8,
    justifyContent: 'center',

  }
});
