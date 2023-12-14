import { Box, Link, Text } from "~/ui";
import { DotsIcon } from "~/util/icons";

export default function TransactionItem(props: {
  transaction: TransactionData;
}) {
  const { transaction } = props;

  switch (transaction.type) {
    default:
    case "subscription":
      return (
        <Box className="flex flex-row gap-[16px] items-center">
          <Text className="flex-1 text-sm">
            Subscription to{" "}
            <Link
              to={`/profile/${transaction.subscribedTo._id}`}
              className="text-[var(--color-accent)]"
            >
              {transaction.subscribedTo.displayName}
            </Link>
          </Text>
          <Text>
            {transaction.amount.toLocaleString("en-US", {
              style: "currency",
              currency: transaction.currency,
            })}
          </Text>
          <Box className="cursor-pointer rounded-lg hover:bg-[var(--color-hover)] p-4">
            <DotsIcon />
          </Box>
        </Box>
      );
    case "purchase":
      return <></>;
  }
}
