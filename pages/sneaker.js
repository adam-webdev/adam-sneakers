import Image from "next/image";
import React,{useEffect} from "react";
import styled from "styled-components";
import Sepatu from '../public/images/sepatu3.png'
import Link from "next/link"
import Layout from "../components/Layout";
import { useStateContext } from "../utils/Store";
import { useSnackbar } from "notistack";
import ResultSearch from "../components/ResultSearch";
import { useRouter } from "next/router";
export const Container = styled.div`
  padding:  0 80px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  @media(max-width:768px){
    padding: 30px;
  }
  @media(max-width:540px){
    padding: 10px;
  }

`;

export const GridCard = styled.div`
  padding-top:80px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  align-items:center;
  box-sizing:border-box;
  @media(max-width:1300px){
    grid-template-columns: auto auto auto;

  }
  @media(max-width:990px){
    grid-template-columns: auto auto;

  }
  @media(max-width:540px){
    grid-template-columns: auto;
    justify-content:center;

  }
`

export const Card = styled.div`
  width:300px;
  box-sizing:border-box;
  border-radius: 4px;
  border:1px solid rgb(0 0 0 /10%);
  &:hover{
    box-shadow: 4px 4px 6px rgb(0 0 0 /10%);
  }
`

export const CardImage = styled.div`
  width: 100%;
  border-radius:50%;
  display:flex;
  align-items:center;
  flex-direction:column;
`

export const Img = styled(Image)`
  box-shadow:2px 4px 4px 6px rgba(0 0 0 / 50%);
`

export const Background = styled.span`
  width: 90%;
  cursor:pointer;
  /* background:${props => props.background ? props.background : 'gold' }; */
  height: 50px;
  margin-top:-50px;
  background:  rgba(0 0 0 /5%);
  border-radius:50%;
  z-index:2;
  margin-bottom:10px;
  filter: blur(40px);
`

export const CardBody = styled.div`
  padding:10px;
`

export const Brand = styled.h2`
    font-size: 14px;

  text-transform: uppercase;
  @media(max-width:540px){
    font-size: 16px;
  }
`
export const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  @media(max-width:540px){
    font-size: 16px;
  }
`

export const ButtonDetail = styled.a`
  padding:  8px 12px;
  /* background-color: black; */
  background:${props => props.background ? props.background : 'gold' };
  color:#fff;
  width:100%;
  border:1px solid black;
  display:block;
  border-radius:4px;
  text-align:center;
  &:hover{
    box-shadow: 2px 2px 2px rgb( 0 0 0 / 40%);
  }
`
export const ButtonFavorite = styled.a`
  padding:  8px 12px;
  color:#000;
  border:1px solid #000;
  width:100%;
  border-radius:4px;
  display:block;
  text-align:center;
  cursor:pointer;
  margin-bottom:10px;
  &:hover{
    box-shadow: 2px 2px 2px rgb( 0 0 0 / 40%);
  }
`
const ButtonChangeColor = styled.button`
  background:black;
  border:none;
  color:#fff;
  text-decoration:none;
  cursor:pointer;
  padding:6px 8px;
`


const Sneakers = ({dataStatic}) => {
  const {state,dispatch,searchInput,results,setResult,loading} = useStateContext()
  const {enqueueSnackbar,closeSnackbar} = useSnackbar()
  const router = useRouter()
  useEffect(() => {
    if(searchInput){
        router.push(`/sneaker?q=${searchInput}`)
      }
  },[searchInput])

  // const LoadMore = () => {
  //   setLimit((current) => current + 10)
  // }

  setResult(dataStatic)
  const handleFavorite = (data) => {
  closeSnackbar()
    const existItem = state.favorites.favItems.some(exist => exist.id === data.id)
    if(existItem){
      enqueueSnackbar("favorite already exist",{variant:'warning'})
    }else{
      enqueueSnackbar("successfuly added to favorite",{variant:'success'})
      dispatch({type:"ADD_FAVORITES",payload:{...data}})
    }

  }


  // const RandomColor = () => {
  //   var letters = '0123456789ABCDEF';
  //   var colorData = "#"
  //   for (var i = 0; i < 6; i++) {
  //     colorData += letters[Math.floor(Math.random() * 16)];
  //   }

  //   if(colorData !== "#FFFFFF"){
  //     return colorData
  //   }
  // }
console.log("hasil search",searchInput)
console.log("hasil query",results)
  if(searchInput){
    return <ResultSearch />
  }else{
    return (
      <Layout title="All Sneakers" description="Sepatu murah, keren, dan bagus">
      <Container>
        <GridCard>
          {dataStatic?.results?.map((data,index) => (
            <Card key={index}>
              <CardImage>
                <Img src={ data.image.original !== "" ? data.image.original : Sepatu} width={300} height={300}  alt={data?.name} />
                <Background background="#FFBF00"  />
              </CardImage>
              <CardBody>
                <Brand>{data?.brand}</Brand>
                <Price>${data?.retailPrice === 0 ? 23 : data.retailPrice}</Price>
                <p>{data?.name}</p>
                <ButtonFavorite  onClick={()=> handleFavorite(data)} >Add Favorite</ButtonFavorite>
                <Link href={`/sneaker/${data.id}`} passHref>
                  <ButtonDetail background="#000">Detail</ButtonDetail>
                </Link>
              </CardBody>
          </Card>
          ))}
        </GridCard>
      </Container>
      </Layout>
    )
  }
}

export async function getStaticProps(){
  const data = await fetch(`https://the-sneaker-database.p.rapidapi.com/sneakers?limit=100`,{
    headers:{
      "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
      "x-rapidapi-key": "bdc388d739msh63b1e4fd7b76c10p194c57jsna34ac259c378"
    }
  })
  const dataStatic = await data.json()
  return {
    props: { dataStatic }
  }
}
export default Sneakers;
