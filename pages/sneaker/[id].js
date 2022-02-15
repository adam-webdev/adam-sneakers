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
  const [results,setResults] = useState([])
  // const {id} = useParams()
  const router = useRouter()
  const { id } = router.query
  console.log(id)

    const fetchSneakerId = async () => {
      setSearchInput("")
      try {
          setLoading(true)
          const fetchId = await fetch(`https://the-sneaker-database.p.rapidapi.com/sneakers/${id}`,{
            headers:{
              "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
              "x-rapidapi-key": "fabd47de84msh1b480869cbf2da5p1a08fajsn8261be62e22d"
            }})
          const fetchIdJson = await fetchId.json()
          console.log(fetchIdJson)
          setResults(fetchIdJson.results[0])
          setLoading(false)
      } catch(err) {
        console.log(err)
      }
    }
  useEffect(() => {
    fetchSneakerId()
  },[])
  // useEffect(() => {
  //   if(searchInput){
  //     router.push(`/sneaker?q=${searchInput}`)
  //   }
  // },[searchInput])

console.log(results)
  if(searchInput){
    return(
      <ResultSearch />
    )
  }else{

  return (
    <Layout title="Sneaker Detail" description={results?.name}>
      <Container>
        <Left>
          <Img src={results?.image ? results?.image.original : Sepatu } width="100%" height="100%" layout="responsive" objectFit="contain" alt="Sepatu detail" />
        </Left>
        <Right>
          <Span>
            <Name>Brand : </Name>
            <p>{results?.brand}</p>
          </Span>
          <Span>
            <Name>Name : </Name>
            <p>{results?.name}</p>
          </Span>
          <Span>
            <Name>Gender : </Name>
            <p>{results?.gender}</p>
          </Span>
          <Span>
            <Name>Color : </Name>
            <p>{results?.colorway}</p>
          </Span>
          <Span>
            <Name>Release Year : </Name>
            <p>{results?.releaseYear}</p>
          </Span>
          <Span>
            <Name>Release Date : </Name>
            <p>{results?.releaseDate}</p>
          </Span>
          <Span>
            <Name>Price : </Name>
            <p>$ {results?.retailPrice}</p>
          </Span>
          <Span>
            <Name>Sku : </Name>
            <p>{results?.sku}</p>
          </Span>
          <Span>
            <Name>Silhouette : </Name>
            <p>{results?.silhouette}</p>
          </Span>
          <Span>
            <Name>Links for Buy : </Name>
            <Link href={results?.links?.flightClub !== undefined ? results?.links?.flightClub : ""} passHref><Links target="_blank">{results?.links?.goat !== "" ? "flightClub " : ""}</Links></Link>
            <Link href={results?.links?.goat !== undefined ? results?.links?.goat : ""} passHref><Links target="_blank">{results?.links?.goat !== "" ? "Goat " : ""}</Links></Link>
            <Link href={results?.links?.stadiumGoods !== undefined ? results?.links?.stadiumGoods : ""} passHref><Links target="_blank">{results?.links?.stadiumGoods !== "" ? "Stadium Goods " : ""}</Links></Link>
            <Link href={results?.links?.stockX  !== undefined ? results?.links?.stockX : ""} passHref><Links target="_blank">{results?.links?.stockX !=="" ? "Stock X " : ""}</Links></Link>
          </Span>
        </Right>
      </Container>
      <WrappStory>
        <Name>
          Story :
        </Name>
        <Story>{results?.story ? results?.story : " (-) story does not exist"}</Story>
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
