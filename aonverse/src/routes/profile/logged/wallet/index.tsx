import { aon } from "~/sdk";
import { Box } from "~/ui";
import { RouteSwitch } from "~/components/RouteSwitch";
import { Navigate } from "react-router";
import { LinkTab, LinkTabs } from "~/components/LinkTabs";
import PaymentMethodsRoute from "./methods";
import TransactionsRoute from "./transactions";
import Sidebar from "~/components/Sidebar";
import { Container } from "~/components/Container";

export default function WalletRouter() {
  const logged = aon.store((x) => x.session?.user);

  return (
    <Sidebar side="right" collapsible>
      <Container size={800} className="flex flex-col gap-[40px] p-[40px]">
        <Box className="flex flex-row align-items-center justify-between">
          <Box />

          {/* Tabs */}
          <LinkTabs>
            <LinkTab link={`/profile/${logged?._id}/wallet/methods`}>
              Methods
            </LinkTab>
            <LinkTab link={`/profile/${logged?._id}/wallet/transactions`}>
              Transactions
            </LinkTab>
          </LinkTabs>
        </Box>

        <RouteSwitch
          id="community"
          routes={[
            {
              key: "starred",
              patterns: [`/profile/${logged?._id}/wallet/methods`],
              Component: PaymentMethodsRoute,
            },
            {
              key: "liked",
              patterns: [`/profile/${logged?._id}/wallet/transactions`],
              Component: TransactionsRoute,
            },
            {
              key: "fallback",
              patterns: [`/profile/${logged?._id}/wallet/*`],
              Component: () => (
                <Navigate
                  to={`/profile/${logged?._id}/wallet/methods`}
                  replace
                />
              ),
            },
          ]}
        />
      </Container>
    </Sidebar>
  );
}
