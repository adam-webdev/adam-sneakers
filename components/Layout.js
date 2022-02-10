import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'
import { useRouter } from 'next/router'
import styled from "styled-components"
import Link from 'next/link'


const Div = styled.div`
  padding: 100px 80px 0 80px;
  @media(max-width:768px){
    padding:110px 30px 0 30px;
  }
  @media(max-width:540px){
    padding:70px 10px 0 10px;
  }

`
const Breadcumb = styled.p`
  font-size:18px;
  background:  rgba(0 0 0 /5%);
  padding:10px 8px;
  color:#000;
  @media(max-width:540px){
    font-size:14px;
    padding:6px 8px;

  }
`
// const Div = styled.div``
// const Div = styled.div``
const Layout = ({title,description,children}) => {
  const router = useRouter()
  const breadcumbs = router.pathname.substr(1)
  return (
    <>
    <Head>
      <title>{title ? `${title} | adam sneakers` : "adam sneakers"}</title>
      {description && <meta name="description" content={description} ></meta>}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar />
    <Div>
      <Breadcumb><Link href="/sneaker">Home</Link> &gt; {breadcumbs}</Breadcumb>
    </Div>
    {children}
    </>
  )
}

export default Layout
