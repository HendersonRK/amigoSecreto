import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
    return (
        <>
            <StatusBar/>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: true }} />
                <Stack.Screen name="contacts" options={{ headerShown: true }} />
            </Stack>
        </>
    )
}