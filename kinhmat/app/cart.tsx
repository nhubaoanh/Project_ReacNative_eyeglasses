import { CartScreen } from '@/src/screens/cart/CartScreen';
import { useRouter } from 'expo-router';

export default function Cart() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleCheckout = () => {
        // Navigate to checkout page when implemented
        console.log('Navigate to checkout');
    };

    return (
        <CartScreen 
            onBack={handleBack}
            onCheckout={handleCheckout}
        />
    );
}
