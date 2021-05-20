import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const SectionHeader = ({ title }) => {
  const { container, titleText } = styles;
  return (
    <View style={container}>
    <Text style={titleText}>{title}</Text>
  </View>
  )
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: { 
    height: 30, 
    justifyContent: 'center', 
    backgroundColor: 'lightgrey', 
    borderRadius: 5, 
    paddingLeft: 5
  },
  titleText: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});

export default SectionHeader;