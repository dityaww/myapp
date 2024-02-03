import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    marginTop: 40
  },
  descDataUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  data: {
    flexDirection: "row",
    gap: 30,
  },
  btnFollow: {
    // borderWidth: 1,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  post: {
    marginTop: 40,
    flexBasis: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
  },
  nameUsers: {
    paddingHorizontal: 30,
    // borderWidth: 1,
    marginTop: 15
  }
});

export default styles;
