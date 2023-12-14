import { chain, map } from "lodash";
import { DateTime } from "luxon";
import { Fragment, useMemo } from "react";
import { useAsync } from "react-async-hook";
import TransactionItem from "~/components/TransactionItem";
import { aon } from "~/sdk";
import { Box, Divider, Text } from "~/ui";
import { MotionBox } from "~/ui/motion";
import { childVariants } from "~/util/motion";

export default function TransactionsRoute() {
  const { result: transactions } = useAsync(aon.getTransactions, [], {
    executeOnMount: true,
    executeOnUpdate: false,
  });

  const groupedTransactions = useMemo(
    () =>
      chain(transactions)
        .groupBy((x) => DateTime.fromISO(x.createdAt).toISODate())
        .value(),
    [transactions]
  );

  return (
    <Box className="gap-[20px]">
      {map(groupedTransactions, (group, date) => (
        <Fragment key={date}>
          <Text className="my-[20px] text-lg text-bold">
            {DateTime.fromISO(date).toLocaleString({
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
          {chain(group)
            .flatMap((x, i) => [
              <MotionBox key={x.id} variants={childVariants({ fade: 1 })}>
                <TransactionItem transaction={x} />
              </MotionBox>,
              <Divider key={`divider-${i}`} />,
            ])
            .slice(0, -1)
            .value()}
        </Fragment>
      ))}
    </Box>
  );
}
