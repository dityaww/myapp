import { COLORS } from "../../constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // height: 400,
    // backgroundColor: "red",
    position: "relative",
  },
  contentWrapper: {
    // borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: 10,
  },
  setTextcolor: {
    color: COLORS.neutral[700],
  },
  headerContent: {
    // marginHorizontal: 22,
    // marginVertical: 15,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 120 / 2,
  },
});

export default styles;
