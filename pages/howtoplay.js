import Head from "next/head";
import Header from "../components/GENERAL/Header";
import Footer from "../components/GENERAL/Footer";
import React from "react";
// import FAQ from '../components/GENERAL/HowToPlay'
import HowToPlay from "../components/GENERAL/HowToPlay";

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>Fantasy betting platform</title>
        <meta name="description" content="Fantasy betting platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="web-container">
        <Header />
        <HowToPlay />
        <Footer />
      </div>
    </>
  );
}
