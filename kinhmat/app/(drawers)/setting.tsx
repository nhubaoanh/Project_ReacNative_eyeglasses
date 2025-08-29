import { CartScreen } from "../../src/screens/cart/CartScreen";
import { Text, View } from "react-native";

export default function setting() {
    const handleBack = () => {
        // Handle back navigation
    };

    const handleCheckout = () => {
        // Handle checkout - navigate to checkout screen
        console.log('Checkout pressed');
    };

    return (
        <CartScreen
            onBack={handleBack}
            onCheckout={handleCheckout}
        />
    );
}