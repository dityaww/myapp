import { COLORS, SIZES } from "../../constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: "#d4d4d4",
    marginHorizontal: 10,
  },
  postWrapper: {
    // borderWidth: 2,
    marginVertical: 20,
    
  },
  category: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginHorizontal: 10,
  },
  styleCategory: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 7,
    borderColor: "#d4d4d4",
    color: "#737373",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default styles;
