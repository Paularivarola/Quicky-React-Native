import React, { useState } from 'react'
import { View, StyleSheet, Text, SafeAreaView, StatusBar, Platform, Dimensions, ImageBackground, ScrollView, Pressable } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const CategoryCarousel = (props) => {
    const [slide, setSlide] = useState(0)
    const sliderWidth = Dimensions.get('screen').width - 30
    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide} key={index}>
                <ImageBackground source={{ uri: `https://quickly-food.herokuapp.com${item.img}` }} style={styles.background}>
                </ImageBackground>
                <View style={styles.infoContainer}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productIngredients}>{item.ingredients}</Text>
                    <View style={styles.containerPrice}>
                        <Text style={styles.textPrice}>${item.price}</Text>
                        <Pressable style={styles.button}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }} onPress={() => props.navigation.navigate('product', { chosen: item })}>+</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Carousel
                layout={'default'}
                data={props.products}
                renderItem={_renderItem}
                sliderWidth={sliderWidth}
                itemWidth={sliderWidth}
                autoplay={true}
                enableMomentum={false}
                onBeforeSnapToItem={(index) => setSlide(index)}
                // lockScrollWhileSnapping={true}
                loop={true}
                activeAnimationType={'spring'}
            />
            <Pagination
                dotsLength={props.products.length}
                activeDotIndex={slide}
                dotStyle={{
                    width: 7,
                    height: 7,
                    borderRadius: 5,
                    backgroundColor: '#fe6849',
                    marginBottom: 0,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    )
}

export default CategoryCarousel

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
        padding: 5,
    },
    slide: {
        width: '100%',
        height: 160,
        marginVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        padding: 8,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 5,
        shadowRadius: 10,
        elevation: 2,
        backgroundColor: "white",
    },
    background: {
        width: 120,
        height: 120,
        borderRadius: 10,
        // borderTopStartRadius: 10,
        // borderBottomStartRadius: 10,
        marginRight: 5,
        overflow: 'hidden'
    },
    infoContainer: {
        height: 120,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    productName: {
        width: '100%',
        color: "#fe6849",
        textAlign: 'center',
        padding: 5,
        fontSize: 18,
    },
    button: {
        backgroundColor: "#fe6849",
        width: "18%",
        borderRadius: 5,
        padding: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 5,
    },
    productIngredients: {
        textAlign: "center",
        paddingBottom: 5,
    },
    containerPrice: {
        flexDirection: "row",
        width: "70%",
        paddingTop: 10,
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 0.4,
    },
    textPrice: {
        fontSize: 18,
        fontWeight: "bold",
    }
})