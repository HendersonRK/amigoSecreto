import { StyleSheet } from "react-native";
import { colors } from "../../themes/global";

export const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: colors.bluegrey200,
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderColor: colors.bluegrey200,
    },
    placeHolder: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        color: colors.grey900,
    },
    itemTitle: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    contact: {
        fontSize: 18,
        color: colors.indigo600,
    },
    form: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});