import useSWR from "swr";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AstrologyCard({ sign, icon }) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/daily/${sign}`,
    fetcher
  );

  // Access the 'data' property safely
  const secondData = data?.data?.[1];

  // Capitalize the first letter of the sign
  const capitalizedSign = sign.charAt(0).toUpperCase() + sign.slice(1);

  const [opened, { open, close }] = useDisclosure(false);

  function handleClick() {
    open();
  }

  return (
    <>
      <div
        onClick={handleClick}
        className="relative hover:cursor-pointer hover:shadow hover:shadow-slate-300 w-48 h-52 flex flex-col border rounded-md backdrop-blur-sm bg-blue-50/30 p-2"
      >
        <div className="flex items-center justify-center">{icon}</div>
        <div className="text-center text-xl font-semibold">
          {capitalizedSign}
        </div>
        {isLoading || error ? (
          <LoadingOverlay visible={isLoading}></LoadingOverlay>
        ) : (
          <div className="text-sm mt-4 line-clamp-4">{secondData}</div>
        )}
      </div>

      <Modal opened={opened} onClose={close} title={sign.toUpperCase()}>
        <div className="flex items-center justify-center">{icon}</div>
        {isLoading || error ? (
          <LoadingOverlay visible={isLoading}></LoadingOverlay>
        ) : (
          <div className="text-sm mt-4">{secondData}</div>
        )}
      </Modal>
    </>
  );
}

export default AstrologyCard;
