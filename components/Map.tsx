import { Alert, Dimensions, StyleSheet, View, Image } from "react-native";
import MapView from "react-native-maps";
import { useRef, useState } from "react";

import TopComponent from "./TopComponent";
import FooterComponent from "./FooterComponent";

interface SelectedLocationProps {
  latitude: number;
  longitude: number;
  readableAddress?: string;
  title: string;
}

export async function getReadableAddress(lat: number, lng: number) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_GOOGLEMAP}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address. Please try again!");
  }
  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}

function Map() {
  const [pickedLocation, setPickedLocationHandler] =
    useState<SelectedLocationProps>();
  const mapRef = useRef<MapView>(null);

  const initialRegion = {
    latitude: 10.762574,
    longitude: 106.682359,
    latitudeDelta: 0.00522,
    longitudeDelta: 0.00421,
  };

  async function onRegionChange(latitude: number, longitude: number) {
    const address = await getReadableAddress(latitude, longitude);
    if (address == "") {
      Alert.alert("Could not find address", "Please pick another location");
      return;
    }

    setPickedLocationHandler({
      latitude: latitude,
      longitude: longitude,
      readableAddress: address,
      title: pickedLocation ? pickedLocation.title : "",
    });
  }

  async function searchHandler(
    latitude: number,
    longitude: number,
    title: string
  ) {
    const address = await getReadableAddress(latitude, longitude);
    if (address == "") {
      Alert.alert("Could not find address", "Please pick another location");
      return;
    }

    setPickedLocationHandler({
      latitude: latitude,
      longitude: longitude,
      readableAddress: address,
      title: title,
    });

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.00522,
        longitudeDelta: 0.00421,
      });
    }
  }

  return (
    <View style={styles.container}>
      <TopComponent searchHandler={searchHandler} />

      <View style={styles.mapContainer}>
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={initialRegion}
          userInterfaceStyle="dark"
          showsUserLocation={true}
          rotateEnabled={false}
          onRegionChangeComplete={(region) =>
            onRegionChange(region.latitude, region.longitude)
          }
          ref={mapRef}
        ></MapView>

        <View style={styles.markerFixed}>
          <Image
            style={styles.marker}
            source={require("../assets/icon-marker.png")}
          />
        </View>

        {pickedLocation && (
          <FooterComponent
            title={pickedLocation.title}
            readableAddress={pickedLocation.readableAddress}
          />
        )}
      </View>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
});
