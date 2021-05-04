import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Address = ({title, description}) => {
  return (
    <View style={styles.adressBox}>
      <Text style={styles.addressTitle}>{title}</Text>
      <Text style={styles.addressText}>{description}</Text>
    </View>
  );
};

const UserCard = props => {
  let hiddenStatus;
  if (props.index === 0) {
    hiddenStatus = true;
  } else {
    hiddenStatus = false;
  }

  const [isHidden, setIsHidden] = useState(hiddenStatus);

  const showHidden = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'linear', 'opacity'),
    );
    setIsHidden(!isHidden);
  };

  return (
    <TouchableOpacity style={styles.userCard} onPress={showHidden}>
      <View style={styles.mainBox}>
        <View style={styles.mainIco}>
          <Image
            style={styles.mainImage}
            source={{uri: props.data.picture.medium}}
          />
        </View>
        <TouchableOpacity
          style={styles.mainText}
          onPress={() => {
            props.modalContactsHandle(props.index);
          }}>
          <Text style={styles.mainName}>
            {`${props.data.name.title} ${props.data.name.first} ${props.data.name.last}`}
          </Text>
          <Text style={styles.mainPhone}>Phone: {props.data.phone}</Text>
        </TouchableOpacity>
      </View>
      {isHidden ? (
        <View style={styles.hiddenBox}>
          <Address
            title="ADDRESS"
            description={`${props.data.location.country} ${props.data.location.city} ${props.data.location.street.name} ${props.data.location.street.number}`}
          />
          <Address title="EMAIL" description={props.data.email} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userCard: {
    width: 363,
    height: 'auto',
    paddingBottom: 15,
    marginBottom: 9,
    backgroundColor: '#E5E5E5',
    borderRadius: 15,
    overflow: 'hidden',
  },
  mainPhone: {
    fontSize: 16,
    fontWeight: '400',
    color: '#00add3',
  },
  mainName: {
    fontSize: 25,
    fontWeight: '700',
    color: '#00add3',
  },
  mainIco: {
    alignSelf: 'center',
    width: 63,
    height: 63,
    borderWidth: 5,
    borderColor: '#00add3',
    borderRadius: 32,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  mainBox: {
    paddingTop: 15,
    paddingLeft: 21,
    flexDirection: 'row',
  },
  mainText: {
    flex: 3,
    paddingLeft: 31,
  },
  hiddenBox: {
    paddingLeft: 115,
  },
  addressTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00add3',
  },
  addressText: {
    fontSize: 15,
    fontWeight: '400',
  },
  adressBox: {
    flex: 3,
    paddingRight: 10,
  },
});

export default UserCard;
