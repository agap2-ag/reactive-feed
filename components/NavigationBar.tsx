import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types';

const NavigationBar = ({ title, leftText, onPressLeftText, btn }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftText}
        onPress={onPressLeftText}
      >
        <Text>{leftText}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      { btn &&
        <TouchableOpacity
          style={styles.btn}
          onPress={btn.func}
        >
          <Text>{btn.txt}</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

export default NavigationBar;

NavigationBar.propTypes = {
  title: PropTypes.string,
  leftText: PropTypes.string,
  onPressLeftText: PropTypes.func,
  btn: PropTypes.object
}

NavigationBar.defaultProps = {
  title: '',
  leftText: '',
  onPressLeftText: () => { },
  btn: null
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
  },
  leftText: {
    position: "absolute",
    left: 20,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  btn: {
    position: "absolute",
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  }
})
