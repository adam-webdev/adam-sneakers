import Head from "next/head";
import Image from "next/image";
import {useEffect} from 'react'
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/sneaker')
  }, [])
  return (
    <div>
      <Head>
        <title>Sneakers</title>
        <meta name="description" content="Sneaker global" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
    </div>
  );
}
