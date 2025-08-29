import Drawer from "expo-router/drawer";

export default function DrawerLayout(){
    return(
        <Drawer screenOptions={{
            headerShown: true,
            drawerType: "slide",
            drawerActiveTintColor: "#007AFF", // màu khi chọn - sử dụng primary color
            drawerInactiveTintColor: "#8E8E93", // màu khi không chọn
            headerTintColor: "#007AFF", // màu header
        }}>
            <Drawer.Screen name="index" options={{title:"Home"}}/>
        </Drawer>
    )
}