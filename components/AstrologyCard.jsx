import useSWR from "swr";
import { useRouter } from "next/router";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// Fetch data
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

  const router = useRouter();

  function handleClick() {
    router.push(`/signs/${sign}`);
  }

  return (
    <>
      <div onClick={handleClick} className="card">
        <div className="sign-icon">{icon}</div>
        <div className="sign-name">{capitalizedSign}</div>
        {isLoading || error ? (
          <LoadingOverlay visible={isLoading}></LoadingOverlay>
        ) : (
          <div className="text-sm mt-4 hidden md:line-clamp-2 lg:line-clamp-4">
            {secondData}
          </div>
        )}
      </div>
    </>
  );
}

export default AstrologyCard;
