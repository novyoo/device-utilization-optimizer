import React from 'react'
import ReactDOM from 'react-dom/client'
import { FluentProvider, webDarkTheme } from '@fluentui/react-components'
import App from './App.jsx'
import './index.css'

const appTheme = {
  ...webDarkTheme,
  fontFamilyBase: "'Plus Jakarta Sans', system-ui, 'Segoe UI', Roboto, sans-serif",
  fontFamilyMonospace: "'Space Mono', 'SFMono-Regular', Consolas, monospace",

  colorBrandBackground: '#FFAE19',
  colorBrandBackgroundHover: '#E0961A',
  colorBrandBackgroundPressed: '#C27D12',
  colorBrandBackgroundSelected: '#E0961A',
  colorBrandForeground1: '#FFAE19',
  colorBrandForeground2: '#E0961A',
  colorBrandForegroundLink: '#FFAE19',
  colorBrandForegroundLinkHover: '#E0961A',
  colorBrandForegroundOnLight: '#FFAE19',
  colorCompoundBrandForeground1: '#FFAE19',
  colorCompoundBrandForeground1Hover: '#E0961A',
  colorCompoundBrandStroke: '#FFAE19',
  colorCompoundBrandStrokeHover: '#E0961A',
  colorNeutralForegroundOnBrand: '#14120E', 
  colorNeutralForegroundInverted: '#14120E',

  // Text
  colorNeutralForeground1: '#F0D9A8',
  colorNeutralForeground2: '#C6AD7C',
  colorNeutralForeground3: '#8C7A56',
  colorNeutralForeground2BrandHover: '#FFAE19',
  colorNeutralForeground2BrandSelected: '#FFAE19',

  // Surfaces
  colorNeutralBackground1: '#242019',
  colorNeutralBackground1Hover: '#2e2920',
  colorNeutralBackground1Pressed: '#14120e',
  colorNeutralBackground2: '#1A1814',
  colorNeutralBackground2Hover: '#242019',
  colorNeutralBackground3: '#2e2920',
  colorNeutralBackground3Hover: '#33301f',
  colorNeutralBackground4: '#14120E',
  colorNeutralBackgroundDisabled: '#201d17',
  colorSubtleBackground: 'transparent',
  colorSubtleBackgroundHover: 'rgba(255, 174, 25, 0.08)',
  colorSubtleBackgroundPressed: 'rgba(255, 174, 25, 0.14)',
  colorTransparentBackground: 'transparent',

  // Strokes
  colorNeutralStroke1: '#4A3F2A',
  colorNeutralStroke2: '#33301f',
  colorNeutralStroke3: '#2a2717',
  colorNeutralStrokeAccessible: '#8C7A56',
  colorNeutralStrokeDisabled: '#2a2717',

  // Status 
  colorPaletteRedBackground1: 'rgba(194, 86, 15, 0.14)',
  colorPaletteRedBackground2: 'rgba(194, 86, 15, 0.22)',
  colorPaletteRedBackground3: '#C2560F',
  colorPaletteRedBorder1: '#7a3a0d',
  colorPaletteRedBorder2: '#C2560F',
  colorPaletteRedForeground1: '#e39a6c',
  colorPaletteRedForeground2: '#e39a6c',
  colorPaletteRedForeground3: '#f0d9a8',
  colorPaletteGreenBackground1: 'rgba(255, 174, 25, 0.14)',
  colorPaletteGreenBackground2: 'rgba(255, 174, 25, 0.22)',
  colorPaletteGreenBackground3: '#FFAE19',
  colorPaletteGreenBorder1: '#8a6420',
  colorPaletteGreenBorder2: '#FFAE19',
  colorPaletteGreenForeground1: '#FFAE19',
  colorPaletteGreenForeground2: '#FFAE19',
  colorPaletteGreenForeground3: '#14120E',
  colorPaletteYellowBackground1: 'rgba(255, 174, 25, 0.1)',
  colorPaletteYellowBackground2: 'rgba(255, 174, 25, 0.18)',
  colorPaletteYellowBackground3: '#c27d12',
  colorPaletteYellowBorder1: '#8a6420',
  colorPaletteYellowBorder2: '#c27d12',
  colorPaletteYellowForeground1: '#f0d9a8',
  colorPaletteYellowForeground2: '#FFAE19',
  colorPaletteYellowForeground3: '#14120E',

  // Shadows 
  shadow4: '0 1px 3px rgba(0,0,0,0.5)',
  shadow8: '0 2px 8px rgba(0,0,0,0.5)',
  shadow16: '0 4px 16px rgba(0,0,0,0.55)',
  shadow28: '0 8px 28px rgba(0,0,0,0.6)',

  // Slightly softer corners app-wide, for a smoother/rounder feel
  borderRadiusSmall: '6px',
  borderRadiusMedium: '10px',
  borderRadiusLarge: '14px',
  borderRadiusXLarge: '18px',

  // Bigger base font sizes across every Fluent component
  fontSizeBase200: '15px',
  fontSizeBase300: '17px',
  fontSizeBase400: '19px',
  fontSizeBase500: '24px',
  fontSizeBase600: '30px',
  lineHeightBase300: '24px',
  lineHeightBase400: '26px',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FluentProvider theme={appTheme} style={{ background: 'transparent' }}>
      <App />
    </FluentProvider>
  </React.StrictMode>,
)
