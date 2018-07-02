import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

/**
* Function that calculates rotation of the semicircle for firstProgressLayer
* ( when percent is less than equal to 50 ) or for the secondProgressLayer
* when percent is greater than 50.
**/
rotateByStyle = (percent, base_degrees, clockwise) => {
  let rotateBy = base_degrees;
  if(clockwise){
      rotateBy = base_degrees + (percent * 3.6);
  }else{
    //anti clockwise progress
    rotateBy = base_degrees - (percent * 3.6);
  }
  return {
    transform:[{rotateZ: `${rotateBy}deg`}]
  };
}

renderThirdLayer = (percent, commonStyles, ringColorStyle, ringBgColorStyle, clockwise) => {
  let rotation = 45;
  let offsetLayerRotation = -135;
  if(!clockwise){
    rotation += 180;
    offsetLayerRotation = 45;
  }
  if(percent > 50){
    /**
    * Third layer circles default rotation is kept 45 degrees for clockwise rotation, so by default it occupies the right half semicircle.
    * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
    * before passing to the rotateByStyle function
    **/

    return <View style={[styles.secondProgressLayer,rotateByStyle((percent - 50), rotation, clockwise), commonStyles, ringColorStyle ]}></View>
  }else{
    return <View style={[styles.offsetLayer, commonStyles, ringBgColorStyle, {transform:[{rotateZ: `${offsetLayerRotation}deg`}]}]}></View>
  }
}

const CircularProgress = ({percent, radius, ringWidth, ringColor, ringBgColor, textFontSize, textFontWeight, clockwise}) => {
  const commonStyles = {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    borderWidth: ringWidth
  };

  const ringColorStyle = {
    borderRightColor: ringColor,
    borderTopColor: ringColor,
  };

  const ringBgColorStyle = {
    borderRightColor: ringBgColor,
    borderTopColor: ringBgColor,
  };

  let rotation = -135;
  /**
  * If we want our ring progress to be displayed in anti-clockwise direction
  **/
  if(!clockwise){
    rotation += 180;
  }
  let firstProgressLayerStyle;
  if(percent > 50){
      firstProgressLayerStyle = rotateByStyle(50, rotation, clockwise);
  }else {
    firstProgressLayerStyle = rotateByStyle(percent, rotation, clockwise);
  }

  return(
    <View style={[styles.container, commonStyles, {borderColor: ringBgColor}]}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle, commonStyles, ringColorStyle]}></View>
      {renderThirdLayer(percent, commonStyles, ringColorStyle, ringBgColorStyle, clockwise)}
      <Text style={[styles.display, {fontSize: textFontSize,fontWeight: textFontWeight}]}>{percent}%</Text>
    </View>
  );
}

// default values for props
CircularProgress.defaultProps = {
  percent: 0,
  radius: 100,
  ringWidth: 20,
  ringColor: '#3498db',
  ringBgColor: 'grey',
  textFontSize: 40,
  textFontWeight: 'bold',
  clockwise: true
}

/**
* offsetLayer has transform:[{rotateZ: '-135deg'}] since
* the offsetLayer rotation is fixed by us.
**/
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstProgressLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  secondProgressLayer:{
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  offsetLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform:[{rotateZ: '-135deg'}]
  },
  display: {
    position: 'absolute'
  }
});

export default CircularProgress;
