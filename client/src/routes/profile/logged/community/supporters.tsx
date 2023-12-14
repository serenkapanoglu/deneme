import { useAsync } from "react-async-hook";
import SupportCard from "~/components/SupportCard";
import { aon } from "~/sdk";
import { Box } from "~/ui";

export default function SupportersRoute() {
  const { result: supporters, execute: fetchSupports } = useAsync(
    aon.getSupportedUsers,
    [],
    {
      executeOnMount: true,
      executeOnUpdate: false,
    }
  );

  return (
    <Box
      className={
        "grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 <lg:px-[20px]"
      }
    >
      {supporters?.map((x) => (
        <SupportCard
          key={x.supported._id}
          support={x}
          onUnsupport={async () => {
            await aon.unsupportUser(x.supported._id);
            await fetchSupports();
          }}
        />
      ))}
    </Box>
  );
}
