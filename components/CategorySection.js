import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import ProductCard from './ProductCard'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CategoryCarousel from './CategoryCarousel';
import CategoryList from './CategoryList';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';


const CategorySection = (props) => {
    const [view, setView] = useState(true)
    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Text style={styles.title}>{props.category}</Text>
                <Icon
                    name={!view ? 'view-carousel' : 'format-list-bulleted'}
                    size={30}
                    color='#fe6847'
                    onPress={() => setView(!view)}
                />
            </View>
            {view
                ? <CategoryCarousel navigation={props.navigation} products={props.products} route={props.route} />
                : props.products.map(product => <CategoryList product={product} key={product._id} route={props.route} />)
            }
        </View>
    )
}

export default CategorySection

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        marginBottom: 20,
        marginHorizontal: 'auto',
        width: '100%'

    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 25,
        marginBottom: 5,
        fontWeight: "700",
        color: "#fe6849",
    },
    buttonContainer: {
        flexDirection: 'row'
    }
})