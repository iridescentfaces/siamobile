import React from 'react';
import {StyleSheet, Text, View, Button, Image,
				TouchableOpacity, FlatList, Modal, TouchableHighlight} from 'react-native';
import { List, ListItem} from 'react-native-elements';

const data = {
	"id": 5,
	"header": "SEAT 24D LEGREST INOP",
	"description": "",
	"plane":
	{
		"regn": "SWT",
		"acType": "77W",
		"inbound": 238,
		"outbound": 237,
		"ETA": "2017-10-26T12:00:00Z",
		"ETD": "2017-10-26T16:00:00Z",
		"bay": "A13/A13/C20"
	},
	"techsAssigned": [
	{
		"user":
		{
			"username": "testing",
			"first_name": "John",
			"last_name": "Alpaca",
			"last_login": null
		},
		"user_type": 2,
		"avatar": null,
		"lon": null,
		"lat": null
	}],
	"dateReported": "2017-10-25T16:38:40.004399Z",
	"dateResolved": null,
	"closed": false,
	"classCode": "premium",
	"category": "seats",
	"img": null,
	"priority": 0,
	"spares": [
	{
		"spare":
		{
			"partID": "XYZ123",
			"name": "chair",
			"stock": 10
		},
		"quantity": 1,
		"drawn": false
	},
	{
		"spare":
		{
			"partID": "XYZ124",
			"name": "table",
			"stock": 10
		},
		"quantity": 1,
		"drawn": false
	}],
	"updates": [
	{
		"author":
		{
			"user":
			{
				"username": "testing",
				"first_name": "John",
				"last_name": "Alpaca",
				"last_login": null
			},
			"user_type": 2,
			"avatar": null
		},
		"details": "Whole chair broken, need extra parts",
		"created": "2017-10-25T16:38:40.018867Z"
	}]
}

export default class TaskDetail extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		tabBarLabel: 'Tasks',
		tabBarIcon: ({tintColor}) => (
			<Image 
				source={require('../../images/tasks_icon.png')}
				style={{width: 30, height: 30, tintColor: 'darkblue'}}
			/>
		)
	});

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

	updateTask = (first) => {
		this.props.navigation.navigate('TaskUpdate', first);
	}

	renderSeparator = () => {
	return (
	  <View
	    style={{
	      height: 1,
	      width: "95%",
	      backgroundColor: "#CED0CE",
	      marginLeft: "5%"
	    }}
	  />
	);
	};

	render() {
		const {header, description, closed, img, priority} = data;
		const {regn, acType, ETA, ETD, bay, ... others} = data.plane;
		const {history} = data.updates;
		const {spares} = data.spares;
		// const {first, last, title} = this.props.navigation.state.params.name;
		// console.log(this.props.navigation.state.params);

		
		historyContents = data.updates.map(function(update) {
			return (
				<View key={update.created} style={styles.historyContent}>
					<Text>{update.details}</Text>
				</View>
			);
		});

		sparesContents = data.spares.map(function(spare) {
			return (
				<View key={spare.spare.partID} style={styles.historyContent}>
						<Text>{spare.quantity} {spare.spare.name}</Text>
				</View>
			);
		})

		return(
			<View style={styles.container}>
				<View style={styles.detailsContainer}>
					<Text style={{ fontWeight: '700', 
												 fontSize: 24, 
												 textDecorationLine: 'underline',
												 alignItems: 'center' }}>{header}</Text>
					<Text style={styles.detailsText}><Text style={styles.title}>Description:</Text> {description}</Text>
					<Text style={styles.title}>Pictures:</Text>
					{img}
					<Text style={styles.detailsText}><Text style={styles.title}>Priority:</Text> {priority}</Text>
					<Text style={styles.detailsText}><Text style={styles.title}>ETA:</Text> {ETA}</Text>
					<Text style={styles.detailsText}><Text style={styles.title}>ETD:</Text> {ETD}</Text>
					<Text style={styles.detailsText}><Text style={styles.title}>Aircraft:</Text> {regn} {acType}</Text>
					<Text style={styles.detailsText}><Text style={styles.title}>Bay Location:</Text> {bay}</Text>
					<Text style={styles.title}>History: </Text>
					{historyContents}
					<Text style={styles.title}>Spares Required: </Text>
					{sparesContents}
				</View>
				<View style={styles.buttonContainer}>
	        <TouchableOpacity 
	        		style={styles.button}
	        		onPress={() => {
          						this.setModalVisible(true)}}
	        		// onPress={() => this.updateTask(data)}
	      		>
        		<Text style={styles.buttonText}>CHECKED</Text>
					</TouchableOpacity>
				</View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#FFF'
	},
	historyContent: {
		alignSelf: 'stretch',
	},
	detailsContainer: {
		flex: 9,
	},
	buttonContainer: {
		flex: 1,
		alignItems: 'center',
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
  },
  title: {
  	fontWeight: '700',
  	fontSize: 16,
  },
  detailsText: {
  	fontSize: 16,
  }
});