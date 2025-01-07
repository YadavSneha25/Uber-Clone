import { View,Text } from "react-native";

const RideLayout=({children}:
    {children:React.ReactNode}
)=>{
    return (
        <View>
            <Text>TOP OF THE LAYOUT</Text>
            {children}
            <Text>BOTTOM OF THE LAYOUT</Text>
            
        </View>
    )

}
export default RideLayout;