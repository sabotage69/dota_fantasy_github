import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <div className="eth-error-screen">
        <p>⚠️Something broke⚠️</p>
        <Link href="/">
          <a onClick={() => window.location.reload()}>Please 🙏 try again</a>
        </Link>
      </div>
    </>
  );
}
