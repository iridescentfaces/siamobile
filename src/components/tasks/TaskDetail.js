import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';

export default class TaskDetail extends React.Component {
//this.props.navigation.state.params
	render() {
		return(
			<View style={styles.container}>
				<Text style={styles.text}>TaskDetail</Text>
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