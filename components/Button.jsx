import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SIZES, COLORS } from '../constants'

const Button = ({ title, style, onPress }) => {
   return (
      <TouchableOpacity
         style={{
            ...style,
            ...styles.btn,
         }}
         onPress={onPress}
      >
         <Text>{title}</Text>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   btn: {
      paddingHorizontal: SIZES.padding,
      paddingVertical: SIZES.padding,
      borderColor: COLORS.primary,
      borderWidth: 2,
      borderRadius: SIZES.padding,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primary,
   },
})

export default Button
