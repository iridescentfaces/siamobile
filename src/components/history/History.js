import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';

export default class History extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'History',
		tabBarIcon: ({tintColor}) => (
			<Image 
				source={require('../../images/history_icon.png')}
				style={{width: 30, height: 30, tintColor: 'grey'}}
				/>
		)
	}

	render() {
		return(
			<View style={styles.container}>
				<Text style={styles.text}>History</Text>
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