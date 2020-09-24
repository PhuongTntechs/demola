import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

// let num = 3

// let offset = 343-num*(width-44)/5;
let selected = 1;

let yoffset = -30;
// let primColor= '#4687FD';
let iconSize = 25;
// let selectedIconColor='white'
// let iconColor='black'

let mainOffSet = Platform.OS === 'ios' ? 20 : 0;

let slider = [
  (2 * 1 - 1) * ((1 * (width / 6)) / 2) + 85,
  (2 * 6 - 1) * ((1 * (width / 6)) / 2) + 86,
];

export default class CurvedNavBar extends Component {
  state = {
    iconColor: 'black', //default color black
    primColor: '#4687FD',
    selectedIconColor: 'white',
    mainOffSetIos: 20,
    mainOffSetAndroid: 0,
  };

  animatedValue = new Animated.Value(
    this.props.selected ? this.props.selected : 1,
  );

  componentDidMount() {
    this.setState({
      icon1: this.props.icons[0],
      icon2: this.props.icons[1],
      icon3: this.props.icons[2],
      icon4: this.props.icons[3],
      icon5: this.props.icons[4],
      icon6: this.props.icons[5],
      iconColor: this.props.iconColor ? this.props.iconColor : 'black',
      primColor: this.props.navColor ? this.props.navColor : '#4687FD',
      selectedIconColor: this.props.selectedIconColor
        ? this.props.selectedIconColor
        : 'white',
    });

    this._start(this.props.selected ? this.props.selected : 1); //select the tab else 1
  }

  state = {
    fadeValue: new Animated.Value(1),
    id1: new Animated.Value(1),
    id2: new Animated.Value(1),
    id3: new Animated.Value(1),
    id4: new Animated.Value(1),
    id5: new Animated.Value(1),
    id6: new Animated.Value(1),

    i1: new Animated.Value(0),
    i2: new Animated.Value(0),
    i3: new Animated.Value(0),
    i4: new Animated.Value(0),
    i5: new Animated.Value(0),
    i6: new Animated.Value(0),

    h1: new Animated.Value(0),
    h2: new Animated.Value(0),
    h3: new Animated.Value(0),
    h4: new Animated.Value(0),
    h5: new Animated.Value(0),
    h6: new Animated.Value(0),

    hh1: new Animated.Value(300),
    hh2: new Animated.Value(20),
    hh3: new Animated.Value(20),
    hh4: new Animated.Value(20),
    hh5: new Animated.Value(20),
    hh6: new Animated.Value(20),
  };

  changeTab = (id) => {
    let idd = 'id' + id;
    let hh = 'h' + id;
    let iddd = 'i' + id;

    let h = 'hh' + id;

    let a = this.state[idd];
    let b = this.state[hh];
    let c = this.state[iddd];

    let d = this.state[h];

    // this.setState({[idd]: new Animated.Value()})
    Animated.timing(a, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(b, {
      toValue: 100,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(c, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(); //icon circle upp
    Animated.timing(d, {
      toValue: 5,
      duration: 300,
      useNativeDriver: false,
    }).start(); //icon circle upp

    this._showAll(id);
  };

  _showAll = (id) => {
    for (let i = 1; i <= 6; i++) {
      if (i !== id) {
        let idd = 'id' + i;
        let iddd = 'i' + i;
        let h = 'hh' + i;
        let hh = 'h' + i;
        let d = this.state[h];
        let a = this.state[idd];
        let b = this.state[hh];
        let c = this.state[iddd];
        Animated.timing(a, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start(); // icon fade
        Animated.timing(b, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(); //icon lower
        Animated.timing(c, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(); //icon lower rest
        Animated.timing(d, {
          toValue: 10,
          duration: 200,
          useNativeDriver: false,
        }).start(); //icon lower rest
        Animated.timing(this.animatedValue, {
          toValue: id,
          duration: 200,
          useNativeDriver: false,
        }).start(); //navbar
      }
    }
  };

  _start = (id) => {
    let idd = 'id' + id;
    let hh = 'h' + id;
    let iddd = 'i' + id;

    let h = 'hh' + id;

    let a = this.state[idd];
    let b = this.state[hh];
    let c = this.state[iddd];

    let d = this.state[h];

    // this.setState({[idd]: new Animated.Value()})
    Animated.timing(a, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(b, {
      toValue: 100,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(c, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(); //icon circle upp
    Animated.timing(d, {
      toValue: 5,
      duration: 300,
      useNativeDriver: false,
    }).start(); //icon circle upp

    this.showall(id);
  };

  showall = (id) => {
    for (let i = 1; i <= 6; i++) {
      if (i !== id) {
        let idd = 'id' + i;
        let iddd = 'i' + i;
        let h = 'hh' + i;
        let hh = 'h' + i;
        let d = this.state[h];
        let a = this.state[idd];
        let b = this.state[hh];
        let c = this.state[iddd];
        Animated.timing(a, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start(); // icon fade
        Animated.timing(b, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(); //icon lower
        Animated.timing(c, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(); //icon lower rest
        Animated.timing(d, {
          toValue: 10,
          duration: 200,
          useNativeDriver: false,
        }).start(); //icon lower rest
        Animated.timing(this.animatedValue, {
          toValue: id,
          duration: 200,
          useNativeDriver: false,
        }).start(); //navbar
      }
    }
    this.props.cb(id);
  };

  render() {
    const navrr = this.animatedValue.interpolate({
      inputRange: [1, 6],
      outputRange: slider,
      extrapolate: 'clamp',
    });

    let off = Platform.OS === 'ios' ? height : height + 20;
    if (this.props.mainOffSetAndroid) {
      off =
        Platform.OS === 'ios'
          ? height
          : height + 20 - this.props.mainOffSetAndroid;
    }
    if (this.props.mainOffSetIos) {
      off =
        Platform.OS === 'ios' ? height - this.props.mainOffSetIos : height + 20;
    }

    return (
      <View style={{position: 'absolute', top: off}}>
        <View
          style={{
            backgroundColor: this.state.primColor,
            position: 'absolute',
            width: width,
            height: 83,
            bottom: 30 + yoffset,
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
        />

        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: -20 + yoffset,
            width: width,
            height: 100,
          }}
        />

        <Animated.View style={{position: 'absolute', bottom: 0, left: navrr}}>
          <View
            style={{
              backgroundColor: this.state.primColor,
              position: 'absolute',
              bottom: 65.5 + yoffset,
              width: 45,
              right: 61.8,
              height: 45,
              borderRadius: 40,
            }}
          />

          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 0 + yoffset,
              right: 100,
              width: width,
              height: 100,
              borderRadius: 40,
            }}
          />

          {/* <View style={{backgroundColor:'white',position:'absolute',
      bottom:0+yoffset,
      right:-345,
      width:width,
      height:100,

        borderRadius:40
        }}></View> */}

          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 0 + yoffset,
              right: Platform.OS === 'ios' ? -345 : -343,
              width: width,
              height: 100,
              borderRadius: 40,
            }}
          />
        </Animated.View>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: width,
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 20,
          }}>
          <TouchableOpacity onPressOut={() => this._start(1)}>
            <Animated.View
              style={{opacity: this.state.i1, top: this.state.hh1}}>
              <AwesomeIcon
                name={this.state.icon1}
                size={iconSize}
                color={this.state.selectedIconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={() => this._start(2)}>
            <Animated.View
              style={{opacity: this.state.i2, top: this.state.hh2}}>
              <AwesomeIcon
                name={this.state.icon2}
                size={iconSize}
                color={this.state.selectedIconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={() => this._start(3)}>
            <Animated.View
              style={{opacity: this.state.i3, top: this.state.hh3}}>
              <AwesomeIcon
                name={this.state.icon3}
                size={iconSize}
                color={this.state.selectedIconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={() => this._start(4)}>
            <Animated.View
              style={{opacity: this.state.i4, top: this.state.hh4}}>
              <AwesomeIcon
                name={this.state.icon4}
                size={iconSize}
                color={this.state.selectedIconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={() => this._start(5)}>
            <Animated.View
              style={{opacity: this.state.i5, top: this.state.hh5}}>
              <AwesomeIcon
                name={this.state.icon5}
                size={iconSize}
                color={this.state.selectedIconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={() => this._start(6)}>
            <Animated.View
              style={{opacity: this.state.i6, top: this.state.hh6}}>
              <AwesomeIcon
                name={this.state.icon6}
                size={iconSize}
                color={this.state.selectedIconColor}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: -20,
            width: width,
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 20,
          }}>
          <TouchableOpacity
            onPressOut={() => this._start(1)}
            style={{...styles.wicon}}>
            <Animated.View
              style={{opacity: this.state.id1, top: this.state.h1}}>
              <AwesomeIcon
                name={this.state.icon1}
                size={30}
                color={this.state.iconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => this._start(2)}
            style={{...styles.wicon}}>
            <Animated.View
              style={{opacity: this.state.id2, top: this.state.h2}}>
              <AwesomeIcon
                name={this.state.icon2}
                size={30}
                color={this.state.iconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => this._start(3)}
            style={{...styles.wicon}}>
            <Animated.View
              style={{opacity: this.state.id3, top: this.state.h3}}>
              <AwesomeIcon
                name={this.state.icon3}
                size={30}
                color={this.state.iconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => this._start(4)}
            style={{...styles.wicon}}>
            <Animated.View
              style={{opacity: this.state.id4, top: this.state.h4}}>
              <AwesomeIcon
                name={this.state.icon4}
                size={30}
                color={this.state.iconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => this._start(5)}
            style={{...styles.wicon}}>
            <Animated.View
              style={{
                opacity: this.state.id5 ? this.state.id5 : 1,
                top: this.state.h5,
              }}>
              <AwesomeIcon
                name={this.state.icon5}
                size={30}
                color={this.state.iconColor}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => this._start(6)}
            style={{...styles.wicon}}>
            <Animated.View
              style={{
                opacity: this.state.id6 ? this.state.id6 : 1,
                top: this.state.h6,
              }}>
              <AwesomeIcon
                name={this.state.icon6}
                size={30}
                color={this.state.iconColor}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wicon: {
    alignItems: 'center',
    width: width / 6,
    paddingTop: 10,
    top: -10,
  },
});
