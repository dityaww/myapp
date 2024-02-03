import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#d4d4d4",
    marginVertical: 10,
  },
  wrapper: {
    // borderWidth: 1,
    // margin: 5,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 120 / 2,
  },
  imageContent: {
    height: 300,
  },
  topContent: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "#d4d4d4",
    alignItems: "center",
    gap: 12,
    paddingTop: 6,
    marginHorizontal: 10,
  },
  captions: {
    marginBottom: 12,
    marginHorizontal: 10,
    textAlign: "left",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    paddingStart: 12,
    paddingTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
