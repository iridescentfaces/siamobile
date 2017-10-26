import React from 'react';
import {StyleSheet, Text, View, Button, Image,
				TouchableOpacity, FlatList} from 'react-native';
import { List, ListItem} from 'react-native-elements';

const data = {
	"id": 5,
	"header": "SEAT 24D LEGREST INOP",
	"description": "nil",
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
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
			tabBarLabel: 'Tasks',
			tabBarIcon: ({tintColor}) => {
				return <Image 
					source={require('../../images/tasks_icon.png')}
					style={{width: 30, height: 30, tintColor: tintColor}}
				/>;
			},
			headerRight: (
				<Button title="Save"
												onPress={() => params.handleSave()} />
			)
		};	
	};

	saveDetails = (first) => {
		alert('Update Details');
		// this.props.navigation.navigate('TaskUpdate', first);
	}

	componentDidMount() {
		this.props.navigation.setParams({ handleSave: this.saveDetails });
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
				// <View key={update.created} style={styles.historyContent}>
					`${update.details}`
				// </View>
			);
		});

		sparesContents = data.spares.map(function(spare) {
			return (
				// <View key={spare.spare.partID} style={styles.historyContent}>
					`${spare.quantity} ${spare.spare.name}`
				// </View>
			);
		})
		const detail01 = [
			{key: '01', title: "Defect", value: header},
			{key: '02', title: "Description", value: description},
			{key: '08', title: "Pictures", value: img},
		]

		const detail02 = [
			{key: '02', title: "Priority", value: priority},
			{key: '03', title: "ETA", value: ETA},
			{key: '04', title: "ETD", value: ETD},
			{key: '05', title: "Reg. No.", value: regn},
			{key: '06', title: "AC Type", value: acType},
			{key: '07', title: "Bay Location", value: bay},
		]

		const detail03 = [
			{key: '09', title: "History", value: historyContents},
		]

		const detail04 = [
			{key: '10', title: "Spares Required", value: sparesContents},
		]

		return(
			<View style={styles.container}>
				<View style={styles.detailsContainer}>
					<Text style={{ fontWeight: '700', fontSize: 16, color: 'grey',
													margin: 5 }}>Defect</Text>
					<FlatList 
						data={detail01}
						renderItem={({item}) => (
							<ListItem
        				title={`${item.title}`}
      					rightTitle={`${item.value}`}
      					containerStyle={{ backgroundColor: '#FFF', borderBottomWidth: 0 }}
      					hideChevron
							/>
						)}
						keyExtractor={item => item.key}
          	ItemSeparatorComponent={this.renderSeparator}
					/>
					<Text style={{ fontWeight: '700', fontSize: 16, color: 'grey',
													margin: 5 }}>Information</Text>
					<FlatList 
						data={detail02}
						renderItem={({item}) => (
							<ListItem
        				title={`${item.title}`}
      					rightTitle={`${item.value}`}
      					containerStyle={{ backgroundColor: '#FFF', borderBottomWidth: 0 }}
      					hideChevron
							/>
						)}
						keyExtractor={item => item.key}
          	ItemSeparatorComponent={this.renderSeparator}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
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
  }
});