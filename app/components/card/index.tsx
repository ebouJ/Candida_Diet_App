import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native'

const { height, width } = Dimensions.get('window')



interface Props {
    image: any,
    title: string,
    onPress(): void
}

class Card extends Component<Props,{}> {
    state = {
        itemRotate: new Animated.Value(0),
        itemHeight: new Animated.Value(175)
    }

    startAnimation = () => {
        Animated.parallel([
            Animated.timing(this.state.itemRotate, {
                toValue: 1,
                duration: 1000,
            }),
            Animated.timing(this.state.itemHeight, {
                toValue: 250,
                duration: 1500,
            })
        ]).start()
    }

    render() {

        const animationHeightStyle = {
            height: this.state.itemHeight
        }

        const { image, title ,onPress } = this.props;
        return (
            
            <Animated.View style={[styles.card, animationHeightStyle]}>
                <TouchableWithoutFeedback  onPress={onPress}>
                <View style={styles.cardContent}>
                    <Image 
                        source={image} 
                        style={styles.image} 
                        resizeMode={"cover"}
                    />
                    <View style={styles.cardTextBox}>
                            <Text style={styles.cardTitleMain}>{title}</Text>    
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        width: width / 2.5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 4,
    },

    cardContent: {
        transform: [{ translateY: -25 }]
    },
    image: {
        width: '100%',
        height: height / 6,
        borderRadius: 10,
    },

    cardTextBox: {
        lineHeight: 12,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },



    cardTitleMain: {
        fontSize: 14,
        color: '#000',
        fontWeight: '600',
        fontFamily: 'roboto',
    },

    cardTitleSub: {
        fontSize: 10,
        color: '#ccc',
        fontWeight: '700'
    },
})

export default Card;