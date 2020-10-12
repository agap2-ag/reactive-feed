import React, { Component } from 'react'
import { Text, StyleSheet, ViewPropTypes, ActivityIndicator, SafeAreaView } from 'react-native'

import { fetchImages, deviceTopMargin } from '../utils/api'
import CardList from '../components/CardList';

export default class Feed extends Component {
  state = {
    loading: true,
    error: false,
    items: [],
  }

  async componentDidMount() {
    try {
      const items = await fetchImages();
      this.setState({
        loading: false,
        items
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  static propTypes = {
    style: ViewPropTypes.style,
  }

  static defaultProps = {
    style: null,
  }

  render() {
    const { commentsForItem, onPressComment, onRefreshClear } = this.props;
    const { loading, error, items } = this.state;

    if (loading) {
      return <ActivityIndicator color="#efe" size="large" />
    }

    if (error) {
      return <Text>Feed Error</Text>
    }
    return (
      <SafeAreaView style={styles.feed}>
        <CardList
          items={items}
          commentsForItem={commentsForItem}
          onPressComment={onPressComment}
          onRefreshClear={onRefreshClear}
          />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    marginTop: deviceTopMargin,
  }
})
