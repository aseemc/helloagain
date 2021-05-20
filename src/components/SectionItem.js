import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import { appStrings } from '../localization';

const SectionItem = ({ item, redeemAlert }) => {
  const { name, pictures, needed_points, redeem_count } = item;

  const {
    container,
    imageStyle,
    labelsView,
    nameView,
    nameText,
    pointsNeededText,
    buttonView,
    button,
    buttonTitle
  } = styles;

  const { labels: { points_needed, redeem_button } } = appStrings;

  return (
    <View style={container}>
      <Image
        style={imageStyle}
        source={pictures.length ? { uri: pictures[0].image } : require('../../assets/image_placeholder.png')}
      />
      <View style={labelsView}>
        <View style={nameView}>
          <Text style={nameText}>{name}</Text>
        </View>
        <Text style={pointsNeededText}>{points_needed}: {needed_points}</Text>
      </View>
      {!redeem_count && <View style={buttonView}>
        <TouchableOpacity 
          style={button}
          onPress={() => redeemAlert({ item })}
        >
          <Text style={buttonTitle}>{redeem_button}</Text>
        </TouchableOpacity>
      </View>}
    </View>
  )
}

SectionItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    pictures: PropTypes.array.isRequired,
    needed_points: PropTypes.number.isRequired,
    redeem_count: PropTypes.oneOfType([ PropTypes.object, PropTypes.number ]),
  }),
  redeemAlert: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 65, 
    width: '100%'
  },
  imageStyle: { 
    borderRadius: 5, 
    width: 50, 
    height: 50
  },
  labelsView: { 
    flex: 1, 
    justifyContent: 'space-evenly', 
    marginLeft: 8
  },
  nameView: { 
    justifyContent: 'center', 
    flex: 1
  },
  nameText: { 
    fontSize: 14, 
    flexWrap: 'wrap'
  },
  pointsNeededText: { 
    fontSize: 12, 
    color: 'grey'
  },
  buttonView: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 8
  },
  button: { 
    height: 30, 
    backgroundColor: 'bisque', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 5, 
    paddingHorizontal: 5
  },
  buttonTitle: { 
    fontSize: 12
  }
});

export default SectionItem;