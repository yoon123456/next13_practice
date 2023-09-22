import Image from "next/image";

export default function Home() {
  return (
    <>
      <h2>Welcome</h2>
      HELLO, WEB!
      <Image src="/test.png" alt="test" width={200} height={200} />
    </>
  );
}
