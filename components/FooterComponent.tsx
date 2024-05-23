import { StyleSheet, Pressable, View, Image, Text } from "react-native";

function FooterComponent({ title, readableAddress }: any) {
  function formattedTitle(title: string) {
    if (title.length > 25) {
      return title.slice(0, 25) + "...";
    }
    return title;
  }

  return (
    <View style={styles.addressContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          paddingLeft: 20,
          marginTop: 20,
        }}
      >
        <View style={styles.iconStyle}>
          <Image
            style={{ width: 18, height: 18, backgroundColor: "white" }}
            source={require("../assets/marker.png")}
          />
        </View>
        <View>
          <Pressable style={styles.titleInput}>
            <Text style={{ fontSize: 17, marginRight: 10 }}>
              {title != "" ? formattedTitle(title) : "Your Title"}
            </Text>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/pen.png")}
            />
          </Pressable>

          <Text style={styles.addressText}>{readableAddress}</Text>
        </View>
      </View>

      <Pressable style={styles.buttonSaveContainer}>
        <Text
          style={{
            fontSize: 17,
            color: "white",
          }}
        >
          Choose this place
        </Text>
      </Pressable>
    </View>
  );
}

export default FooterComponent;

const styles = StyleSheet.create({
  addressContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 220,
    position: "absolute",
    bottom: 0,
    borderRadius: 16,
    borderTopWidth: 2,
    backgroundColor: "white",
    borderColor: "#ff8c2e",
  },
  titleInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    height: 50,
    width: 300,
  },
  iconStyle: {
    padding: 8,
    borderRadius: 50,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: "brown",
  },
  buttonSaveContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#ffb74d",

    borderRadius: 20,
    marginBottom: 40,
  },
});
