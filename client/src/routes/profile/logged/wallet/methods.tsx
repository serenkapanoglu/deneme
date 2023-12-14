import { useAsync } from "react-async-hook";
import PaymentMethodItem from "~/components/PaymentMethod";
import { aon } from "~/sdk";
import { Box } from "~/ui";
import { MotionBox } from "~/ui/motion";
import { childVariants } from "~/util/motion";

export default function PaymentMethodsRoute() {
  const { result: methods } = useAsync(aon.getPaymentMethods, [], {
    executeOnMount: true,
    executeOnUpdate: false,
  });

  return (
    <Box className="gap-[20px]">
      {methods?.map((x) => (
        <MotionBox key={x.id} variants={childVariants({ fade: 1 })}>
          <PaymentMethodItem method={x} />
        </MotionBox>
      ))}
    </Box>
  );
}
