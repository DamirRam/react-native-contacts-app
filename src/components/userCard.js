 import React , {useState} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   ScrollView,
   TouchableOpacity,
   UIManager,
   LayoutAnimation

 } from 'react-native';

 if ( Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental ) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
 }

 const Address = ({title, description}) => {
  return (
    <View>
      <Text style={styles.AddressTitle}>{title}</Text>
      <Text style={styles.AddressText}>{description}</Text>
    </View>
    )
 }

 const UserCard = (props) => {
  let hiddenStatus;
  if(props.index == 0) {
    hiddenStatus = true;
  } else {
    hiddenStatus = false;
  }

   const [isHidden, setIsHidden] = useState(hiddenStatus);

   const showHidden = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'linear', 'opacity')
      );
    setIsHidden(!isHidden);
   }

  return (
      <TouchableOpacity style={[styles.userCard, {height: isHidden ? 190 : 94}]} onPress={showHidden}>
        <View style={styles.mainBox}>
          <View style={styles.mainIco}>
            {<Image style={styles.mainImage} source={{uri: props.data.image}} />}
          </View>
          <View style={styles.mainText}>
            <Text style={styles.mainName}>{props.data.name}</Text>
            <Text style={styles.mainPhone}>Phone: {props.data.phone}</Text>
          </View>
        </View>
        {
          (isHidden) ?
          <View style={styles.hiddenBox}>
            <Address title='ADDRESS' description={props.data.address} />
            <Address title='EMAIL' description={props.data.email} />
          </View>
          :
          null
        }
      </TouchableOpacity>
    )
  }

 const styles = StyleSheet.create({
  userCard: {
    width: 363,
    paddingBottom: 15,
    marginBottom: 9,
    backgroundColor: "#E5E5E5",
    borderRadius: 15,
    overflow: 'hidden'
  },
  mainPhone: {
    fontSize: 16,
    fontWeight: "400",
    color: "#00add3"
  },
  mainName: {
    fontSize: 25,
    fontWeight: "700",
    color: "#00add3"
  },
  mainIco: {
    width: 63,
    height: 63,
    borderWidth: 5,
    borderColor: "#00add3",
    borderRadius: 32
  },
  mainImage: {
    width: "100%",
    height: "100%"
  },
  mainBox: {
    paddingTop: 15,
    paddingLeft: 21,
    flexDirection: "row"
  },
  mainText: {
    paddingLeft: 31
  },
  hiddenBox: {
    paddingLeft: 115
  },
  AddressTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#00add3"
  },
  AddressText: {
    fontSize: 15,
    fontWeight: "400"
  }
 })

 export default UserCard;