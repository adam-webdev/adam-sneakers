import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Sepatu from "../../public/images/sepatu1.png"
import Layout from "../../components/Layout";
import Link from "next/link"
import ResultSearch from '../../components/ResultSearch';
import {useStateContext} from '../../utils/Store'
import { useRouter } from 'next/router';
import {useParams} from "react-router-dom"
import dynamic from 'next/dynamic';
const Container = styled.div`
  padding:30px 80px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  @media(max-width:768px){
    padding:30px;
    flex-direction: column;
  }
  @media(max-width:540px){
    padding:30px 10px;
  }
`

const Left = styled.div`
  width: 50%;
  margin-right:30px;
  border:1px solid rgba(0 0 0 /10%);
  @media(max-width:768px){
    width: 100%;
    margin-right:0;
  }
`

const Img = styled(Image)`
  width: 100%;
  height: 100%;
`
const Right = styled.div`
  width: 50%;
  @media(max-width:768px){
    width: 100%;
  }

`
const Name = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  margin-right:10px;
`
const Span = styled.span`
  display: flex;
  border-bottom: 1px solid grey;
  align-items: center;

`
const Links = styled.a`
  font-size:16px;
  text-transform: uppercase;
  text-decoration: underline;
  margin-right:6px;
`
const WrappStory = styled.div`
  padding:30px 80px;
  @media(max-width:768px){
    padding:30px;
  }
  @media(max-width:540px){
    padding:30px 10px;
  }
`
const Story = styled.p`
  font-size: 18px;
  line-height: 26px;
  @media(max-width:540px){
    font-size: 16px;

  }
`
const SneakerDetail = () => {
  const {searchInput,setSearchInput,setLoading,loading} = useStateContext()
  const [resultsData,setResultsData] = useState([])
  // const {id} = useParams()
  const router = useRouter()
  const { id } = router.query

    const fetchSneakerId = async () => {
      setSearchInput("")
      try {
          setLoading(true)
          const fetchId = await fetch(`https://the-sneaker-database.p.rapidapi.com/sneakers/${id}`,{
            headers:{
              "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
              "x-rapidapi-key": "e3d3017404msh20ce18a12a7d4a8p167944jsn89a50910e30d"
            }})
          const fetchIdJson = await fetchId.json()
          setResultsData(fetchIdJson.results[0])
          setLoading(false)
      } catch(err) {
        console.log(err)
      }
    }
  useEffect(() => {
    fetchSneakerId()
  },[id])
  // useEffect(() => {
  //   if(searchInput){
  //     router.push(`/sneaker?q=${searchInput}`)
  //   }
  // },[searchInput])

  if(searchInput){
    return(
      <ResultSearch />
    )
  }else{

  return (
    <Layout title="Sneaker Detail" description={resultsData?.name}>
      <Container>
        <Left>
          <Img src={resultsData?.image ? resultsData?.image.original : Sepatu } width="100%" height="100%" layout="responsive" objectFit="contain" alt="Sepatu detail" />
        </Left>
        <Right>
          <Span>
            <Name>Brand : </Name>
            <p>{resultsData?.brand}</p>
          </Span>
          <Span>
            <Name>Name : </Name>
            <p>{resultsData?.name}</p>
          </Span>
          <Span>
            <Name>Gender : </Name>
            <p>{resultsData?.gender}</p>
          </Span>
          <Span>
            <Name>Color : </Name>
            <p>{resultsData?.colorway}</p>
          </Span>
          <Span>
            <Name>Release Year : </Name>
            <p>{resultsData?.releaseYear}</p>
          </Span>
          <Span>
            <Name>Release Date : </Name>
            <p>{resultsData?.releaseDate}</p>
          </Span>
          <Span>
            <Name>Price : </Name>
            <p>$ {resultsData?.retailPrice}</p>
          </Span>
          <Span>
            <Name>Sku : </Name>
            <p>{resultsData?.sku}</p>
          </Span>
          <Span>
            <Name>Silhouette : </Name>
            <p>{resultsData?.silhouette}</p>
          </Span>
          <Span>
            <Name>Links for Buy : </Name>
            <Link href={resultsData?.links?.flightClub !== undefined ? resultsData?.links?.flightClub : ""} passHref><Links target="_blank">{resultsData?.links?.goat !== "" ? "flightClub " : ""}</Links></Link>
            <Link href={resultsData?.links?.goat !== undefined ? resultsData?.links?.goat : ""} passHref><Links target="_blank">{resultsData?.links?.goat !== "" ? "Goat " : ""}</Links></Link>
            <Link href={resultsData?.links?.stadiumGoods !== undefined ? resultsData?.links?.stadiumGoods : ""} passHref><Links target="_blank">{resultsData?.links?.stadiumGoods !== "" ? "Stadium Goods " : ""}</Links></Link>
            <Link href={resultsData?.links?.stockX  !== undefined ? resultsData?.links?.stockX : ""} passHref><Links target="_blank">{resultsData?.links?.stockX !=="" ? "Stock X " : ""}</Links></Link>
          </Span>
        </Right>
      </Container>
      <WrappStory>
        <Name>
          Story :
        </Name>
        <Story>{resultsData?.story ? resultsData?.story : " (-) story does not exist"}</Story>
      </WrappStory>
    </Layout>
  )
  }
}


// export async function getStaticPaths(){
//   const dataPath = await fetch(`https://the-sneaker-database.p.rapidapi.com/sneakers?limit=100`,{
//     headers:{
//       "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
//       "x-rapidapi-key": "bdc388d739msh63b1e4fd7b76c10p194c57jsna34ac259c378"
//     }
//   })

//   const resultsPath = await dataPath.json()

//   const paths = resultsPath?.results.map((data) => ({
//     params:{ id: data.id }
//   }))

//   return {
//     paths,
//     fallback:true
//   }
// }

// export async function getStaticProps({params:{id}}){
//   const data = await fetch(`https://the-sneaker-database.p.rapidapi.com/sneakers/${id}`,{
//     headers:{
//       "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
//       "x-rapidapi-key": "bdc388d739msh63b1e4fd7b76c10p194c57jsna34ac259c378"
//     }
//   })

//   const results = await data.json()
//   return{
//     props:{ results }
//   }
// }
export default SneakerDetail
// export default dynamic(() => Promise.resolve(SneakerDetail),{ ssr : false })
