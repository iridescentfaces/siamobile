import React from 'react';
import {StyleSheet, Text, View, Button, Image, StatusBar,
		FlatList, ActivityIndicator} from 'react-native';
import { List, ListItem, SearchBar} from 'react-native-elements';

export default class History extends React.Component {
	static navigationOptions = {
		title: `History`,
		tabBarLabel: 'History',
		tabBarIcon: ({tintColor}) => (
			<Image 
				source={require('../../images/history_icon.png')}
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

	constructor(props) {
	super(props);

	this.state = {
		loading: false,
		data: [],
		page: 1,
		seed: 1,
		error: null,
		refreshing: false,
		};
	}

	componentDidMount() {
		this.makeRemoteRequest();
	}

  onLearnMore = (item) => {
    console.log(item);
    this.props.navigation.navigate('HistoryDetail', item);
  }

	makeRemoteRequest = () => {
    const { page, seed } = this.state;
    // console.log(this.state);
    // headers to include "Authorisation: Token (token)"
    const url = `http://db-gateway-siacabindefects.b9ad.pro-us-east-1.openshiftapps.com/techhistory?id=4`;
    // const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          data: res,
          // data: page === 1 ? res.results : [...this.state.data, ...res.results],
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
	      <View style={styles.container}>
	        <StatusBar barStyle="light-content"/>
	        <FlatList
	          data={this.state.data}
	          renderItem={({ item }) => (
	            date = `${item.dateResolved}`.slice(5,10),
	            month = date.slice(0, 2),
	            day = date.slice(3, 5),
	            formatted_date = day.concat("/", month),
	            time = `${item.dateResolved}`.slice(11,16),
	            <ListItem
	              title={`${item.header}`}
	              // titleStyle={{ fontWeight: '700', fontSize: 20 }}
	              rightTitle={time.concat("  ", formatted_date)}
	              // rightTitleStyle={this.colorStyle(item.priority)}
	              containerStyle={{ backgroundColor: '#FFF', borderBottomWidth: 0 }}
	              onPress={() => this.onLearnMore(item)}
	            />
	          )}
	          keyExtractor={item => item.id}
	          ItemSeparatorComponent={this.renderSeparator}
	          ListHeaderComponent={this.renderHeader}
	          ListFooterComponent={this.renderFooter}
	          onRefresh={this.handleRefresh}
	          refreshing={this.state.refreshing}
	          // onEndReached={this.handleLoadMore}
	          onEndReachedThreshold={20}
	        />
	      </View>
	    );
	  }
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		color: '#000'
	}
});