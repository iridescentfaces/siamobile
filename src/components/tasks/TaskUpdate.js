import React from 'react';
import {StyleSheet, Text, View, Button, Image,
				TouchableOpacity} from 'react-native';

export default class TaskUpdate extends React.Component {


	render() {
		const {first} = this.props.navigation.state.params;
		console.log(this.props.navigation.state.params);
		console.log(first);
		return(
			<View style={styles.container}>
				<View style={styles.detailsContainer}>
					<Text>{first}</Text>
				</View>
				<View style={styles.buttonContainer}>
		        <TouchableOpacity 
            		style={styles.button}
          	>
            <Text style={styles.buttonText}>CHECKED</Text>
          	</TouchableOpacity>
				</View>
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
	buttonContainer: {
		flexGrow: 1,
		padding: 20
	},
	button: {
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});