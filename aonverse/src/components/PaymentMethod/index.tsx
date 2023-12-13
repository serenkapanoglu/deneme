import clsx from "clsx";
import { Box, Image, Text } from "~/ui";
import { DotsIcon, StarIcon } from "~/util/icons";

const commonStyles =
  "rounded-lg border-1 border-solid border-[var(--color-divider)] p-4 flex flex-row items-center gap-[20px]";

export default function PaymentMethodItem(props: {
  method: AonPaymentMethodData;
}) {
  const { method } = props;

  switch (method.type) {
    default:
    case "card":
      return (
        <Box className={clsx(commonStyles)}>
          <Image src={`/paymentMethods/${method.network}.png`} height={50} />
          <Box className="flex-1">
            **** **** **** {method.number.toString().slice(-4)}
          </Box>
          <Text className="text-sm">
            Expiry {method.expMonth}/{method.expYear}
          </Text>
          <Box className="p-4 cursor-pointer hover:bg-[var(--color-hover)] rounded-lg">
            <DotsIcon />
          </Box>
        </Box>
      );
    case "account":
      return (
        <Box
          className={clsx(
            commonStyles,
            "bg-[var(--color-button)] text-[var(--color-button-text)]"
          )}
        >
          <Image src={`/paymentMethods/${method.service}.png`} height={50} />
          <Box className="flex-1"></Box>
          <Box className="flex flex-col items-end">
            <Text>
              {method.balance.toLocaleString("en-US", {
                style: "currency",
                currency: method.currency,
              })}
            </Text>
            <Text className="text-xs">{method.currency}</Text>
          </Box>
          <Box className="p-4 cursor-pointer hover:bg-[var(--color-hover)] rounded-lg">
            <DotsIcon />
          </Box>
        </Box>
      );
    case "stars":
      return (
        <Box className={clsx(commonStyles)}>
          <StarIcon />
          <Box className="flex-1">AONVERSE STARS</Box>
          <Text>
            {method.balance.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          </Text>
          <Box className="p-4 cursor-pointer hover:bg-[var(--color-hover)] rounded-lg">
            <DotsIcon />
          </Box>
        </Box>
      );
  }
}
