import React from 'react'
import styled from "styled-components"
import { CgFormatColor } from "react-icons/cg";
import { BsFacebook,BsGithub,BsInstagram } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
const Container = styled.div`
  padding:  20px 80px;
  margin-top:100px;
  width: 100%;
  background-color: rgba(0 0 0 /90%);
  box-sizing: border-box;
  position: relative;
  @media(max-width:768px){
    padding: 30px;
  }
  @media(max-width:540px){
    padding: 10px;
  }
`;
const WrappFooter = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  @media(max-width:540px){
    flex-direction:column;
    align-items: start;

  }
`
const LeftFooter = styled.div`
  display: flex;
  flex-direction: column;
`
const RightFooter = styled(LeftFooter)``

const WrappIcon = styled.div`
  display:flex;
  width:180px;
  justify-content:space-between;
  @media(max-width:540px){
    flex-direction:column flex-start;
    justify-content:space-between;
    margin-bottom:10px;
  }
`
const IconFooter = styled(CgFormatColor)`
  color:#fff;
  position:relative;
  width:50px;
  cursor:pointer;
  height:50px;
   @media(max-width:540px){
    width:40px;
    height:40px;
  }
`
const P = styled.p`
  color:#fff;
`
const IconFacebook = styled(BsFacebook)`
  color:#fff;
  width:28px;
  height:28px;
  cursor:pointer;
  transition:.2s ease-in-out;
  &:hover{
    transform:scale(1.1)
  }
`
const IconInstagram = styled(BsInstagram)`
  color:#fff;
  width:28px;
  height:28px;
  cursor:pointer;
  transition:.2s ease-in-out;
  &:hover{
    transform:scale(1.1)
  }
`
const IconGithub = styled(BsGithub)`
  color:#fff;
  width:28px;
  height:28px;
  cursor:pointer;
  transition:.2s ease-in-out;
  &:hover{
    transform:scale(1.2)
  }
`
const IconWebsite = styled(BiWorld)`
  color:#fff;
  width:28px;
  height:28px;
  cursor:pointer;
  transition:.2s ease-in-out;
  &:hover{
    transform:scale(1.1)
  }
`
const Footer = () => {

  const handleClickLink = (url) => {
    if(typeof window !== "undefined"){
      window.open(`${url}`,'_blank')
    }
  }

  return (
    <Container>
      <WrappFooter>
      <LeftFooter>
        <IconFooter />
        <P>Adam Sneakers</P>
        <P>Jl. Sama aku, Jadian sama dia, Bekasi, Jawa Barat</P>
      </LeftFooter>
      <RightFooter>
      <P>Links : </P>
      <WrappIcon>
        <IconFacebook onClick={() => handleClickLink('https://www.facebook.com/adamdwi.maulana.35/')} />
        <IconGithub onClick={() => handleClickLink('https://github.com/adam-webdev')} />
        <IconInstagram onClick={() => handleClickLink('https://www.instagram.com/adam_webdev/')} />
        <IconWebsite onClick={() => handleClickLink('https://adam-webdev.netlify.app/')} />
      </WrappIcon>
      </RightFooter>
      </WrappFooter>
      <hr />
        <P>All Right Reserved <b>{new Date().getFullYear()}</b></P>

    </Container>
  )
}

export default Footer
