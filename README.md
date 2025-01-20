## Picking a location with React Native using a performance-oriented approach as what Grab, Uber, and others do

### You can find my blog here: https://minh-le.vercel.app/blog/map

### Traditional concept in choosing a location:
- Do you let them drag a map marker? It needs precision and causes fumbling
- Do they search for their places with autocomplete? Not all buildings are on Google Place

### Current solution:
The most common solution to this problem is putting a marker in the middle of the map, and the user moves the map around it. It's smooth, easy, and requires minimal effort. (like Uber, Grab and others do)

### Problems in a core library called Mapview in React native:
Library: [Mapview React native](https://github.com/react-native-maps/react-native-maps)
In this library: 
- You cannot use the **`onRegionChange`** event on the **`MapView`** component → It will update your state with each movement, re-rendering several times per second and making it a laggy mess.
- You also cannot use **`onRegionChangeComplete`** event. Sure, it only triggers after the user has finished panning around the map, but that's not ideal either. The marker won't move until the user stops.

### 🔥 Solution:
- Use a fake marker positioned at the center of the map. The user moves the map around it. Then I capture the coordinates of this position and update the region. After that, I use the Google Maps Geocoding API to reverse the coordinates to a human-readable address.
- At the same time, I also add a search box with autocomplete for searching places.

### Note: 
- This is super important for Android users, you have to put the View with the Image outside of the Mapview.
- Remember to set `pointer-events` to `none` in the style for the *fake* marker. That'll make the marker unclickable and allow you to pan the map around with ease.
- You can add your own animation with you want

Library and API:
- [React native Google places](https://github.com/FaridSafi/react-native-google-places-autocomplete)
- [React native Mapview](https://github.com/react-native-maps/react-native-maps)
- [Readable address API (Geocoding)](https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding)
