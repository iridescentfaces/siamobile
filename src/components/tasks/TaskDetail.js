import React from 'react';
import {StyleSheet, Text, View, Button, Image, PixelRatio, KeyboardAvoidingView,
				TouchableOpacity, FlatList, ScrollView, TextInput} from 'react-native';
import { List, ListItem} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

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
			headerStyle: {
        backgroundColor: '#04205F'
      },
      headerTitleStyle: {
        color: '#FFF'
      },
      headerTintColor: 'white',
     	headerRight: (
				<Button title="Update" color='white'
												onPress={() => params.handleSave()} />
			),
		};	
	};

	state = {
		image: null,
		message: null,
		error: null,
	}

	saveDetails = (first) => {
		console.log(this.state.message);

    const { image, message } = this.state;
    const { id } = this.props.navigation.state.params;
    console.log(id);
    // console.log(this.state);
    // headers to include "Authorisation: Token (token)"
    const url = `http://db-gateway-siacabindefects.b9ad.pro-us-east-1.openshiftapps.com/updatedefect/${id}`;
    const second_url = `http://db-gateway-siacabindefects.b9ad.pro-us-east-1.openshiftapps.com/update/${id}`;
    // const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;

    fetch(url, {
    	method: 'PATCH',
    	headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'multipart/formdata',
    	},
    	body: JSON.stringify({
    		closed: true,
    		img: image,
    	})
    })
      .then(res => res.json())
      .then(res => {
      	console.log("Hi");
      })
      .then(res => {
  	    fetch(second_url, {
		    	method: 'PUT',
		    	headers: {
		    		'Accept': 'application/json',
		    		'Content-Type': 'application/json',
		    	},
		    	body: JSON.stringify({
		    		author: 4,
		    		details: message,
		    	})
		    })
      })
      .then(res => {
        console.log(res);
        { this.state.error === null ? alert('Updated') : alert(this.state.error); }
      })
      .catch(error => {
        this.setState({ error });
      });
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

	uploadImage = () => {
			const options = {
			  title: 'Upload Photo',
			  storageOptions: {
			    skipBackup: true,
			    path: 'images'
			  }
			};
			ImagePicker.showImagePicker(options, (response) => {
			  console.log('Response = ', response);

			  if (response.didCancel) {
			    console.log('User cancelled image picker');
			  }
			  else if (response.error) {
			    console.log('ImagePicker Error: ', response.error);
			  }
			  else if (response.customButton) {
			    console.log('User tapped custom button: ', response.customButton);
			  }
			  else {
			    let source = { uri: 'data:image/jpeg;base64,' + response.data };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
				  this.setState({
				   	image: source
				  });
      	}
			});

		}

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
					<Text style={{ fontWeight: '700', fontSize: 16, color: 'grey',
													margin: 5 }}>Spares</Text>
					
					<List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
						{
							spares.map((item, i) => (
								name = `${item.spare.name}`.charAt(0).toUpperCase() + `${item.spare.name}`.slice(1),
		            <ListItem
		            	key={i}
		            	title={name}
		            	rightTitle={`${item.quantity}`}
		            	titleStyle={{ color: 'black' }}
		            	rightTitleStyle={{ color: 'black' }}
		            	hideChevron
		            />
	            ))
						}
					</List>
					<Text style={{ fontWeight: '700', fontSize: 16, color: 'grey',
													margin: 5 }}>Additional Details</Text>
          <TextInput
            placeholder="I would like to update that..."
            placeholderTextColor="grey"
            onChangeText={(message) => this.setState({message})}
            style={styles.input}
          />
          <Text style={{ fontWeight: '700', fontSize: 16, color: 'grey',
													margin: 5 }}>Upload Photo</Text>
          <TouchableOpacity
          	style={styles.buttonContainer}
          	onPress={this.uploadImage}
          >

					{ this.state.image === null ? <Image source={require('../../images/upload_icon.png')} 
																					style={{width: 30, height: 30}}/> 
																			: <Image style={styles.ImageContainer} source={this.state.image} />
            }
					</TouchableOpacity>

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