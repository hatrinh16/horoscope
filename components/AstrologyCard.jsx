import useSWR from "swr";
import { useRouter } from "next/router";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// Fetch data
const fetcher = (url) => fetch(url).then((res) => res.json());

function AstrologyCard({ sign, img }) {
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
    router.push(`/daily-horoscope/${sign}`);
  }

  return (
    <>
      <div onClick={handleClick} className="card">
        <div className="sign-icon">
          <img src={img} className="w-[80%]" />
        </div>
        <div className="sign-name">{capitalizedSign}</div>
      </div>
    </>
  );
}

export default AstrologyCard;
