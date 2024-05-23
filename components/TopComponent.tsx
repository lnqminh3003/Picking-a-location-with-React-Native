import { StyleSheet, Pressable, View, Text, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

function TopComponent({ searchHandler }: any) {
  function handleSearch(data: any, detail: any) {
    searchHandler(
      detail.geometry.location.lat,
      detail.geometry.location.lng,
      data.structured_formatting.main_text
    );
  }

  return (
    <View style={styles.topContainer}>
      <Pressable style={styles.buttonBack}>
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../assets/ArrowLeft2.png")}
        />
      </Pressable>

      <View style={{ width: "75%", justifyContent: "center" }}>
        <GooglePlacesAutocomplete
          placeholder="Search your favorite place"
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          onPress={(data, detail) => {
            handleSearch(data, detail);
          }}
          fetchDetails={true}
          query={{
            key: API_GOOGLEMAP, // your google map api key
            language: "vn",
            components: "country:vn",
          }}
          listEmptyComponent={() => (
            <View style={{ flex: 1, padding: 13, backgroundColor: "white" }}>
              <Text>No results were found</Text>
            </View>
          )}
          textInputProps={{
            placeholderTextColor: "#575757",
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,

              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.3,
              shadowRadius: 2.22,

              elevation: 3,
            },
            textInput: {
              height: 45,
              justifyContent: "center",
              color: "#575757",
              fontSize: 14,
              backgroundColor: "white",
              borderRadius: 20,
            },
            listView: {
              borderRadius: 20,
              position: "absolute",
              top: 50,
            },
            row: {
              backgroundColor: "#FFFFFF",
              padding: 13,
              height: 44,
              flexDirection: "row",
            },
          }}
        />
      </View>
    </View>
  );
}

export default TopComponent;

const styles = StyleSheet.create({
  topContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    top: 70,
    zIndex: 1000,

    marginLeft: 20,
  },
  buttonBack: {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 4,
    marginRight: 12,
    borderRadius: 100,
    marginBottom: 5,
    backgroundColor: "white",

    //shadow
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
