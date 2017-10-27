import React from 'react';
import {StyleSheet, Text, View, Button, Image, PixelRatio, KeyboardAvoidingView,
				TouchableOpacity, FlatList, ScrollView, TextInput} from 'react-native';
import { List, ListItem} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

export default class TaskDetail extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
			tabBarLabel: 'History',
			tabBarIcon: ({tintColor}) => {
				return <Image 
					source={require('../../images/tasks_icon.png')}
					style={{width: 30, height: 30, tintColor: tintColor}}
				/>;
			},
			headerStyle: {
        backgroundColor: '#04205F'
      },
      headerTitleStyle: {
        color: '#FFF'
      },
      headerTintColor: 'white',
		};	
	};

	state = {
		image: null,
		message: null,
		error: null,
	}

	componentDidMount() {
		
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
		const data = this.props.navigation.state.params;
		const {header, description, closed, img, priority} = data;
		const {regn, acType, ETA, ETD, bay, ... others} = data.plane;
		const history = data.updates;
		const spares = data.spares;
		// console.log(this.props.navigation.state.params);

		let priorityValue = "null";

		if (priority === 1) {
				priorityValue = "Critical";
		} else if (priority === 2) {
				priorityValue = "High";
		} else {
				priorityValue = "Normal";
		}

		const detail01 = [
			{key: '01', title: "Defect", value: header},
			{key: '02', title: "Description", value: description},
			{key: '08', title: "Picture", value: img},
		]

  	eta_date = ETA.slice(0,10);
    eta_time = ETA.slice(11,16);
    formatted_ETA = eta_time.concat("  ", eta_date);
  	etd_date = ETD.slice(0,10);
    etd_time = ETD.slice(11,16);
    formatted_ETD = etd_time.concat("  ", etd_date);

		const detail02 = [
			{key: '02', title: "Priority", value: priorityValue},
			{key: '03', title: "ETA", value: formatted_ETA},
			{key: '04', title: "ETD", value: formatted_ETD},
			{key: '05', title: "Reg. No.", value: regn},
			{key: '06', title: "AC Type", value: acType},
			{key: '07', title: "Bay Location", value: bay},
			{key: '08', title: "Closed", value: closed},
		]

		return(
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<ScrollView style={styles.detailsContainer}>
					<Text style={{ fontWeight: '700', fontSize: 16, color: 'grey',
													margin: 5 }}>Defect</Text>
					<List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
						{
							detail01.map((item, i) => (
		            <ListItem
		            	key={i}
		            	title={`${item.title}`}
		            	rightTitle={`${item.value}`.toUpperCase()}
		            	titleStyle={{ color: 'black' }}
		            	rightTitleStyle={{ color: 'black' }}
		            	hideChevron
		            />
	            ))
						}
					</List>
					<Text style={{ fontWeight: '700', fontSize: 16, color: 'grey',
													margin: 5 }}>Information</Text>
					
					<List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
						{
							detail02.map((item, i) => (
		            <ListItem
		            	key={i}
		            	title={`${item.title}`}
		            	rightTitle={`${item.value}`}
		            	titleStyle={{ color: 'black' }}
		            	rightTitleStyle={{ color: 'black' }}
		            	hideChevron
		            />
	            ))
						}
					</List>
					<Text style={{ fontWeight: '700', fontSize: 16, color: 'grey',
													margin: 5 }}>History</Text>
					
					<List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
						{
							history.map((item, i) => (
						  	date = `${item.created}`.slice(0,10),
						    time = `${item.created}`.slice(-9,-4),
						    formatted_time = time.concat("  ", date),
		            <ListItem
		            	key={i}
		            	title={`${item.details}`}
		            	subtitle={date}
		            	titleStyle={{ color: 'black' }}
		            	// rightTitleStyle={{ color: 'black' }}
		            	hideChevron
		            />
	            ))
						}
					</List>

				</ScrollView>
			</KeyboardAvoidingView>
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
		flex: 1,
	},
  input: {
    height: 150,
    backgroundColor: '#FFF',
    color: '#000',
    padding: 5
  },
  ImageContainer: {
	  borderRadius: 10,
	  width: 300,
	  height: 300,
	  borderColor: '#9B9B9B',
	  borderWidth: 1 / PixelRatio.get(),
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#CDDC39',
	},
  buttonContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: 'grey',
    fontWeight: '500',
    fontSize: 16
  }
});