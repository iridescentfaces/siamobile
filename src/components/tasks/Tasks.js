import React from 'react';
import {StyleSheet, Text, View, Button, Image, StatusBar,
		FlatList, ActivityIndicator} from 'react-native';
import { List, ListItem, SearchBar} from 'react-native-elements';

export default class Tasks extends React.Component {
	static navigationOptions = ({ navigation }) => ({
    title: `Tasks`,
		tabBarLabel: 'Tasks',
		tabBarIcon: ({tintColor}) => (
			<Image 
				source={require('../../images/tasks_icon.png')}
				style={{width: 30, height: 30, tintColor: 'grey'}}
			/>
		)
	});

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			data: [],
			page: 1,
			seed: 1,
			error: null,
			refreshing: false
		};
	}

	componentDidMount() {
		this.makeRemoteRequest();
	}

	onLearnMore = (item) => {
		this.props.navigation.navigate('TaskDetail', item);
	}

	makeRemoteRequest = () => {
    const { page, seed } = this.state;
    // console.log(this.state);
    // headers to include "Authorisation: Token (token)"
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        // console.log(this.state.data);
        console.log(res.results);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

   handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

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

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <StatusBar barStyle="dark-content"/>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              // roundAvatar
              // avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.onLearnMore(item)}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={10}
        />
      </List>
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
	headerContainer: {
		flexGrow: 1,
		padding: 20,
		flexDirection: 'row',
	},
	header: {
		color: '#000',
		fontWeight: '700',
		fontSize: 16,
	},
	listContainer: {
		flexGrow: 1
	}
});