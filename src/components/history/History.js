import React from 'react';
import {StyleSheet, Text, View, Button, Image,
		FlatList} from 'react-native';
import { List, ListItem} from 'react-native-elements';

export default class History extends React.Component {
	static navigationOptions = {
		title: `History`,
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
				<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
		        	<FlatList
			          data={[{key: '01', item: 'a'},
			          		 {key: '02', item: 'b'},
			          		{key: '03', item: 'c'},
			          		 ]}
			          renderItem={({ item }) => (
			            <ListItem
			            	title={`${item.item}`}
			              	rightTitle={item.value}
			              	containerStyle={{ borderBottomWidth: 0 }}
			              	hideChevron
			            />
			          )}
			          keyExtractor={item => item.key}
			          // ItemSeparatorComponent={this.renderSeparator}
			        />
	      		</List>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	text: {
		color: '#000'
	}
});