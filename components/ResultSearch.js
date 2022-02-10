import Link from 'next/link'
import React from 'react'
import { Background, Brand, ButtonDetail, ButtonFavorite, Card, CardBody, CardImage, Container, GridCard, Img, Price } from '../pages/sneaker'
import Layout from './Layout'
import Sepatu from '../public/images/sepatu1.png'
import { useStateContext } from '../utils/Store'

const ResultSearch = () => {
  const {results,loading} = useStateContext()
  console.log("result search",results)
   return (
      <Layout title="All Sneakers" description="Sepatu murah, keren, dan bagus">
      <Container>
        <GridCard>
          {loading ? (<p>loading...</p>) :
          results?.results?.map((data,index) => (
            <Card key={index}>
              <CardImage>
                <Img src={ data.image.original !== "" ? data.image.original : Sepatu} width={300} height={300}  alt={data?.name} />
                <Background background="#FFBF00"  />
              </CardImage>
              <CardBody>
                <Brand>{data?.brand}</Brand>
                <Price>${data?.retailPrice === 0 ? 23 : data.retailPrice}</Price>
                <p>{data?.name}</p>
                <ButtonFavorite onClick={()=> handleFavorite(data)}>Add Favorite</ButtonFavorite>
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

export default ResultSearch
