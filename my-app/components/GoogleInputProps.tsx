export interface GoogleInputProps {
    icon?: any;
    initialLocation?: string;
    containerStyle?: any; // Changed from string to any to accept style objects
    textInputBackgroundColor?: string;
    handlePress: ({
        latitude,
        longitude,
        address,
    }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
}