import useSWR from "swr";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AstrologyCard({ sign, icon }) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/daily/${sign}`,
    fetcher
  );

  const [opened, { open, close }] = useDisclosure(false);

  function handleClick() {
    open();
  }
  return (
    <>
      <div
        onClick={handleClick}
        className="relative hover:cursor-pointer hover:shadow hover:shadow-slate-300 w-48 h-52 flex flex-col border rounded-md bg-zinc-800 p-2"
      >
        <div className="flex items-center justify-center">{icon}</div>
        <div className="text-center text-xl font-semibold">{sign}</div>
        {isLoading || error ? (
          <LoadingOverlay visible={isLoading}></LoadingOverlay>
        ) : (
          <div className="text-sm mt-4 line-clamp-4">{data.horoscope}</div>
        )}
      </div>

      <Modal opened={opened} onClose={close} title={sign.toUpperCase()}>
        <div className="flex items-center justify-center">{icon}</div>
        {isLoading || error ? (
          <LoadingOverlay visible={isLoading}></LoadingOverlay>
        ) : (
          <div className="text-sm mt-4">{data.horoscope}</div>
        )}
      </Modal>
    </>
  );
}

export default AstrologyCard;
