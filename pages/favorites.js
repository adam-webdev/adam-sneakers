import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Sepatu from '../public/images/sepatu3.png'
import Link from "next/link"
import Layout from "../components/Layout";
import { useStateContext } from "../utils/Store";
import { useSnackbar } from "notistack";
import ResultSearch from "../components/ResultSearch";

const Container = styled.div`
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

const GridCard = styled.div`
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

const Card = styled.div`
  width:300px;
  box-sizing:border-box;
  border-radius: 4px;
  border:1px solid rgb(0 0 0 /10%);
  &:hover{
    box-shadow: 4px 4px 6px rgb(0 0 0 /10%);
  }
`

const CardImage = styled.div`
  width: 100%;
  border-radius:50%;
  display:flex;
  align-items:center;
  flex-direction:column;
`

const Img = styled(Image)`
  box-shadow:2px 4px 4px 6px rgba(0 0 0 / 50%);
`

const Background = styled.span`
  width: 90%;
  cursor:pointer;
  background:  rgba(0 0 0 /5%);
  /* background:${props => props.background ? props.background : 'gold' }; */
  height: 50px;
  margin-top:-50px;
  box-shadow: 2px 2px 3px 2px rgba(0 0 0 /10%);
  border-radius:50%;
  z-index:9999;
  opacity:.6;
  margin-bottom:10px;
`

const CardBody = styled.div`
  padding:10px;
`

const Brand = styled.h2`
  font-size: 14px;
  text-transform: uppercase;
  @media(max-width:540px){
    font-size: 16px;
  }
`
const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  @media(max-width:540px){
    font-size: 16px;
  }
`

const ButtonDetail = styled.a`
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
const ButtonFavorite = styled.a`
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
const H2 = styled.h2`
  font-size:22px;
  @media(max-width:540px){
    font-size:16px;
  }
`
const Favorites = () => {
  const {state,dispatch,searchInput} = useStateContext()
  const {enqueueSnackbar,closeSnackbar} = useSnackbar()
  const LoadMore = () => {
    setLimit((current) => current + 10)
  }

  const handleDeleteFavorite = (data) => {
    enqueueSnackbar("successfuly deleted favorite",{variant:'success'})
    dispatch({type:"DELETE_ITEM_FAVORITES",payload: data})
  }

  if(searchInput) {
    return(
      <ResultSearch />
    )
  }else{
    return (
      <Layout title="All Favorites" description="Favorites your shoes">
      <Container>
            <H2>Your Favorites :</H2>
        {state?.favorites.favItems < 0 ? <p>Kosong </p> : (
        <GridCard>
          {state?.favorites.favItems.map((data,index) => (
            <Card key={index}>
              <CardImage>
                <Img src={ data.image.original !== "" ? data.image.original : Sepatu} width={300} height={300}  alt={data?.name} />
                <Background background="#ffbf00"  />
              </CardImage>
              <CardBody>
                <Brand>{data?.brand}</Brand>
                <Price>${data?.retailPrice === 0 ? 23 : data.retailPrice}</Price>
                <p>{data?.name}</p>
                <ButtonFavorite onClick={() => handleDeleteFavorite(data)}>Delete Favorite</ButtonFavorite>
                <Link href={`/sneaker/${data.id}`} passHref>
                  <ButtonDetail background="#000">Detail</ButtonDetail>
                </Link>
              </CardBody>
          </Card>
          ))}
        </GridCard>
        )}

      </Container>
      </Layout>
    )
  }
}


export default Favorites;
