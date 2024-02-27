import Head from "next/head";
import Header from "../components/GENERAL/Header";
import React from "react";
import PatchNotes from "../components/GENERAL/PatchNotes";

export default function ChangeLogPage() {
  return (
    <>
      <Head>
        <title>Fantasy betting platform</title>
        <meta name="description" content="Fantasy betting platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <PatchNotes />
    </>
  );
}
