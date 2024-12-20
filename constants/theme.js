import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

// theme.js
export const themes = {
   light: {
      backgroundColor: '#FFFFFF',
      primaryColor: '#FF5252',
      textColor: '#000',
   },
   dark: {
      backgroundColor: '#1c1c1c',
      backgroundContent: '#363636',
      backgroundTabBar: '#202020',
      primaryColor: '#788cde',
      textColor: '#FFFFFF',
   },
}

export const COLORS = {
   primary: '#FF5252',
   white: '#FFFFFF',
   background: '#253334',
   gray: '#BEC2C2',
   main: '#92DE8B',
   secondary: '#0AB68B',
   thirdary: '#028174',
   tertiary: '#FFE3B3',
}

export const SIZES = {
   // Global SIZES
   base: 8,
   font: 14,
   radius: 30,
   padding: 8,
   padding2: 12,
   padding3: 16,

   // FONTS Sizes
   largeTitle: 50,
   h1: 30,
   h2: 22,
   h3: 20,
   h4: 18,
   body1: 30,
   body2: 20,
   body3: 16,
   body4: 14,

   // App Dimensions
   width,
   height,
}

export const FONTS = {
   largeTitle: {
      fontFamily: 'black',
      fontSize: SIZES.largeTitle,
      lineHeight: 55,
   },
   h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
   h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
   h3: { fontFamily: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
   h4: { fontFamily: 'bold', fontSize: SIZES.h4, lineHeight: 20 },
   body1: { fontFamily: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
   body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
   body3: { fontFamily: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
   body4: { fontFamily: 'regular', fontSize: SIZES.body4, lineHeight: 20 },
}

const appTheme = { COLORS, SIZES, FONTS, themes }

export default appTheme
