import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types';

const renderItem = (item, index) => {
  return <View key={index} style={styles.comments}>
    <Text>{item}</Text>
  </View>
}

const CommentList = ({ cardImage, items }) => {
  const [loading, setLoading] = useState(true);
  return (
    <ScrollView>
      <View style={styles.image} >
        {loading &&
          <ActivityIndicator
            style={StyleSheet.absoluteFill}
            size="large"
          />
        }
        <Image
          style={StyleSheet.absoluteFill}
          source={cardImage}
          onLoad={() => setLoading(false)}
        />
      </View>
      {items.map(renderItem)}
    </ScrollView>
  )
}

CommentList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default CommentList

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  comments: {
    marginLeft: 20,
    paddingVertical: 20,
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.2)",
  }
})
