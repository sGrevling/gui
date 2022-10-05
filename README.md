# Grevlingui

Gui elements for basic mobile web app stuff

## Components:

- Menu
- SettingsButton
- MenuButton
- RadioButton
- RadioGroup
- CheckBox
- ToggleSwitch

## Props:

Some are passed down to child components

### Menu
- onCloseClickOverride
  - callback function allowing reuse of close menu button
- shouldCloseOnClick 
  - callback function to "validate" whether the click should cause the menu to close 
- transitionTime
  - default 400
- zIndex
  - the lowest z-index, there are different levels
  - default 2
- color
- bgColor
- menuBgColor 
  - overrides bgColor
- backdropColor
  - color for the backdrop on partial slider menu
  - default #e3e6e850
- settings 
  - boolean, whether to use settings icon
  - default falsy
- renderButton
  - render function for custom button 
- className
  - extra class names for the menu
- fullSlider
  - boolean, whether the slider menu should cover the entire available width
  - default falsy
- fader
  - boolean, whether the menu should fade instead of sliding in from the side
- left
  - boolean, makes the menu slide in from the left instead of the right
  - default falsy

### SettingsButton / MenuButton
- open
  - boolean, whether to display as a close button
- setOpen
  - callback function to set the open state
- transitionTime
  - in ms
  - default 300
- stageDelay
  - delay between the 2 "stages" in the animation
  - default 100
- color
  - default 'white'
- backgroundColor
- styles
  - style override for the button
- className
  - extra class names for the button
- rounding
  - SettingsButton only
  - how rounded the icon should be

### RadioButton
  - todo
### RadioGroup
  - todo
### CheckBox
  - todo
### ToggleSwitch
  - todo
