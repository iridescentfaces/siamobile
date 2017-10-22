import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
    	<View style={styles.container}>
    		<Text style={styles.text}>Welcome User</Text>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF'
	},
	text: {
		color: '#000'
	}
});