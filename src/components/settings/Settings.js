import React from 'react';
import {StyleSheet, Text, View, Button, Image,
		FlatList} from 'react-native';
import { List, ListItem} from 'react-native-elements';

export default class Settings extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Settings',
		tabBarIcon: ({tintColor}) => (
			<Image 
				source={require('../../images/settings_icon.png')}
				style={{width: 30, height: 30, tintColor: 'grey'}}
			/>
		),

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

			<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
		        <FlatList
		          data={[{key: '01', item: 'Notifications'},
		          		 {key: '02', item: 'Sounds'},
		          		{key: '03', item: 'Languages', value: 'English'},
		          		 ]}
		          renderItem={({ item }) => (
		            <ListItem
		            	title={`${item.item}`}
		              	rightTitle={item.value}
		              	containerStyle={{ borderBottomWidth: 0 }}
		            />
		          )}
		          keyExtractor={item => item.key}
		          ItemSeparatorComponent={this.renderSeparator}
		          // ListHeaderComponent={this.renderHeader}
		          // ListFooterComponent={this.renderFooter}
		          // onRefresh={this.handleRefresh}
		          // refreshing={this.state.refreshing}
		          // onEndReached={this.handleLoadMore}
		          onEndReachedThreshold={10}
		        />
	      	</List>
	      	</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
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
});