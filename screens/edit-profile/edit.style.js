import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  appBar: {
    marginHorizontal: 22,
    // marginTop: SIZES.xSmall,
  },
  input: {
    borderWidth: 2,
    width: "50%",
    borderColor: COLORS.primary,
  },
  button: {
    alignItems: "center",
    borderColor: COLORS.primary,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 4,
    width: 80,
    borderRadius: 100,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    marginBottom: 15,
  },
  choosePict: {
    display: "flex",
    alignItems: "center",
    width: 120,
    justifyContent: "center",
  },
  btnEdited: {
    backgroundColor: "#0D9488",
    marginTop: 10,
    paddingVertical: 20,
    borderRadius: 120 / 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputFields: {
    // marginTop: SIZES.xxLarge,
    marginHorizontal: SIZES.xSmall,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  textInput: {
    borderBottomColor: COLORS.neutral[200],
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontFamily: "regular",
    fontSize: 16,
    color: COLORS.neutral[800],
  },
  fieldsTitle: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    color: COLORS.neutral[600],
  },
});

export default styles;
