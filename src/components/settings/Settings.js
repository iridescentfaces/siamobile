import React from 'react';
import {StyleSheet, Text, View, Button, Image,
		FlatList} from 'react-native';
import { List, ListItem} from 'react-native-elements';

const data = [{key: '01', title: 'Logout'}]

const settings =[{key: '01', item: 'Notifications', value: " "},
		          		 {key: '02', item: 'Sounds', value: " "},
		          		{key: '03', item: 'Languages', value: 'English'},
		          		 ]

export default class Settings extends React.Component {
	static navigationOptions = {
	    title: `Settings`,
		tabBarLabel: 'Settings',
		tabBarIcon: ({tintColor}) => (
			<Image 
				source={require('../../images/settings_icon.png')}
				style={{width: 30, height: 30, tintColor: tintColor}}
			/>
		),
		headerStyle: {
        	backgroundColor: '#04205F'
      	},
      	headerTitleStyle: {
        	color: '#FFF'
      	}

	}

	logout = () => {
		this.props.navigation.navigate('Login');
	}

	renderSeparator = () => {
	    return (
	      <View
	        style={{
	          height: 1,
	          width: "95%",
	          marginLeft: "5%",
	          backgroundColor: "#CED0CE",
	        }}
	      />
	    );
	  };

	render() {
		return(
			<View style={styles.container}>

			<List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
				{
					settings.map((item, i) => (
            <ListItem
            	key={i}
            	title={`${item.item}`}
            	rightTitle={`${item.value}`}
            	titleStyle={{ color: 'black' }}
            />
          ))
				}
    	</List>

			<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
		        {
		          data.map((item, i) => (
		            <ListItem
		            	key={i}
		            	title={item.title}
		            	titleStyle={styles.logout}
		            	hideChevron
		            	onPress={this.logout}
		            />
		          ))
		        }
	      	</List>

	      	</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		fontSize: 16,
		fontWeight: "700",
	},
	headerContainer: {
		// flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF'
	},
	logout: {
		color: 'red'
	}
});