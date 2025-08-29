import { OrderListScreen } from "@/src/screens/orders/orderListScreen";

export default function Order(){
    const handleBack = () => {
        // Handle back navigation
    };

    const handleCheckout = () => {
        // Handle checkout - navigate to checkout screen
        console.log('Checkout pressed');
    };
    return(
        <OrderListScreen
            onBack={handleBack}
            onOrderDetail={handleCheckout}
        />
    )
}