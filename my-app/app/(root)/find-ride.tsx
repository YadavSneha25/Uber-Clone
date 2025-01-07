import {View,Text} from "react-native";
import {useLocationStore} from "@/store";
import RideLayout from "@/components/RideLayout";

const FindRide=()=>{

    const{
        userAddress,
        destinationAddress,
        setDestinationLocation,
        setUserLocation,

    }=useLocationStore();


    return(
        <RideLayout>
        <View>
            <Text>you are here:{userAddress}</Text>
            <Text>you are going:{destinationAddress}</Text>

        </View>
        </RideLayout>
    )
}
export default FindRide;