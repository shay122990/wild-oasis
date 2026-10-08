import Button from "../../ui/Button";
import { useCheckout } from "../../hooks/check-in-out/useCheckout";

function CheckoutButton({ bookingId }) {
  const { isLoading, mutate: checkout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
