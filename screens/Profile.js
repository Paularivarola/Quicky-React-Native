import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native'
import HistoryProfile from '../components/HistoryProfile'
import PaymentProfile from '../components/PaymentProfile'
import DataProfile from '../components/DataProfile'
import userActions from '../redux/actions/userActions'
import Contact from '../components/Contact'
import { connect } from 'react-redux'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons'

const Profile = ({ userData, navigation }) => {
  const [changeComponent, setChangeComponent] = useState(<DataProfile userData={userData} />)

  if (changeComponent === 'data') {
    setChangeComponent(<DataProfile userData={userData} />)
  } else if (changeComponent === 'help') {
    setChangeComponent(<Contact userData={userData} />)
  } else if (changeComponent === 'history') {
    setChangeComponent(<HistoryProfile userData={userData?._id} />)
  }

  return (
    <ScrollView>
      <View style={styles.containerAllProfile}>
        <View style={styles.containerProfile}>
          <View style={styles.containerProfileName}>
            <Text style={styles.titleHi}>Hola</Text>
            <Text style={styles.profileName}>
              {userData.data.firstName} {userData.data.lastName}
            </Text>
          </View>
          <View style={styles.containerProfileImage}>
            <ImageBackground style={styles.imageProfile} onPress={() => setChangeComponent('data')} resizeMode='cover' source={{ uri: 'https://i.postimg.cc/nV5LvNJQ/pi-a.jpg' }}></ImageBackground>
          </View>
        </View>
        <View style={styles.containAllBoxComponent}>
          <View style={styles.containBoxComponent}>
            <Pressable style={styles.boxComponent} onPress={() => setChangeComponent('data')}>
              <View style={styles.containerImageBox}>
                {/* <ImageBackground style={styles.imageBox} resizeMode="cover" source={{ uri: "https://www.latercera.com/resizer/nq_sgXHp2LhgY71dV9CHtzoUvIo=/200x200/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/Z2NK6DYAPBHO3BVPUE25LQ22ZA.jpg" }}>
								</ImageBackground> */}
                <FontAwesome name='user' size={30} color='tomato' />
              </View>
              <View>
                <Text style={styles.textBox}>Datos</Text>
                <Text style={styles.textBox}>de perfil</Text>
              </View>
            </Pressable>
            <Pressable style={styles.boxComponent} onPress={() => setChangeComponent('help')}>
              <View style={styles.containerImageBox}>
                {/* <ImageBackground style={styles.imageBox} resizeMode="cover" source={{ uri: "https://www.latercera.com/resizer/nq_sgXHp2LhgY71dV9CHtzoUvIo=/200x200/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/Z2NK6DYAPBHO3BVPUE25LQ22ZA.jpg" }}>
								</ImageBackground> */}
                <MaterialCommunityIcons name='headphones' size={30} color='tomato' />
              </View>
              <View>
                <Text style={styles.textBox}>Centro</Text>
                <Text style={styles.textBox}>de ayuda</Text>
              </View>
            </Pressable>
            <Pressable style={styles.boxComponent} onPress={() => setChangeComponent('history')}>
              <View style={styles.containerImageBox}>
                {/* <ImageBackground style={styles.imageBox} resizeMode="cover" source={{ uri: "https://www.latercera.com/resizer/nq_sgXHp2LhgY71dV9CHtzoUvIo=/200x200/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/Z2NK6DYAPBHO3BVPUE25LQ22ZA.jpg" }}>
								</ImageBackground> */}
                <MaterialIcons name='history' size={35} color='tomato' />
              </View>
              <View>
                <Text style={styles.textBox}>Historial</Text>
                <Text style={styles.textBox}>de pedidos</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.containerBanner}>
          <Pressable style={styles.bannerContainer} onPress={() => navigation.navigate('menu')}>
            <ImageBackground resizeMode='cover' style={styles.imageBanner} source={{ uri: 'https://i.postimg.cc/bYB6CVjF/burguer-Cris.png' }}>
              <Text style={styles.titleProduct}>Productos</Text>
            </ImageBackground>
          </Pressable>
        </View>
      </View>
      <View style={styles.containerComponent}>
        <View style={styles.componentContainer}>{changeComponent}</View>
      </View>
    </ScrollView>
  )
}
const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
  }
}
const mapDispachToProps = {}

export default connect(mapStateToProps, mapDispachToProps)(Profile)

const styles = StyleSheet.create({
  containerAllProfile: {
    width: '100%',
    height: 550,
  },
  containerProfile: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerProfileName: {
    height: '100%',
    width: '60%',
    paddingHorizontal: '10%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  containerProfileImage: {
    height: '100%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHi: {
    fontSize: 20,
    marginBottom: 5,
    color: 'grey',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  containAllBoxComponent: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  containBoxComponent: {
    height: '75%',
    width: '95%',
    borderRadius: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  containerImageBox: {
    width: '50%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  boxComponent: {
    width: '22%',
    height: '75%',
    // margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBox: {
    height: '100%',
    width: '100%',
  },
  textBox: {
    textAlign: 'center',
    marginTop: 2,
  },
  imageProfile: {
    height: 140,
    width: 140,
    overflow: 'hidden',
    borderRadius: 150,
  },
  containerBanner: {
    width: '100%',
    height: '25%',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContainer: {
    width: '95%',
    height: '100%',
    padding: 5,
  },
  imageBanner: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 15,
    justifyContent: 'center',
  },
  titleProduct: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  containerComponent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    minHeight: 500,
  },
  componentContainer: {
    width: '95%',
    borderRadius: 15,
    backgroundColor: 'white',
    height: 1000,
  },
})
