import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { TouchableOpacity } from 'react-native';
import firebase from 'firebase'

export default class customSideBarMenu extends React.Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.draweritemscontainer}>
                    <DrawerItems {...this.props} />
                </View>

                <View style={styles.logoutcontainer}>
                    <TouchableOpacity style={styles.logoutbox}
                        onPress={
                            () => {
                                this.props.navigation.navigate('WelcomeScreen')
                                firebase.auth().signOut()
                            }
                        }>
                        <Text style={styles.logouttext}>Logout</Text>
                    </TouchableOpacity>

                </View>

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
    draweritemscontainer: {
        flex: 0.8,

    },
    logoutcontainer: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: 30
    },
    logoutbox: {
        width: 200,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        //borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 40,
        backgroundColor: "white",
    },
    logouttext: {
        fontSize: 15,
        color: '#0e5da2',
        fontWeight: 'bold'
    }
});
