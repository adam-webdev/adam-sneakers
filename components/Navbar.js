import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled,{keyframes} from "styled-components";
import {MdOutlineFavorite} from "react-icons/md"
import {FiSearch} from "react-icons/fi"
import { useStateContext } from "../utils/Store";
import { GrClose } from "react-icons/gr";
import { CgFormatColor } from "react-icons/cg";

const Div = styled.div`
  padding: 20px 80px;
  display: flex;
  flex-grow:1;
  width:100%;
  z-index:999999;
  top:0;
  justify-content:space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba( 0 0 0 / 10%);
  position: fixed;
  background: ${({background}) => (background ? background : `transparent`)};
  box-shadow: ${({shadow}) => (shadow ? shadow : '')};
  /* border-bottom:1px solid rgb( 0 0 0 / 9%); */
  @media(max-width:768px){
    padding: 30px;
  }
  @media(max-width:540px){
    padding: 16px 10px;

  }
`;
const WrappIcon = styled.div`
  display:flex;
  position:relative;
  cursor: pointer;
    padding: 4px;
   &:hover{
    border-radius: 50%;
    padding: 4px;
    background-color: rgba(0 0 0 /7%) ;
  }
`
const Icon = styled(MdOutlineFavorite)`
  width:34px;
  height:34px;
  color:red;
  position:relative;
  @media(max-width:540px){
    width:24px;
    height:24px;
  }

`
const IconLogoMobile = styled(CgFormatColor)`
  color:#000;
  position:relative;
  width:30px;
  cursor:pointer;
  height:30px;
   @media(max-width:540px){
    width:24px;
    height:24px;
  }

`
const WrappIconSearch = styled.div`
  padding:10px 12px;
  background:black;
  box-sizing:border-box;
  cursor: pointer;
  @media(max-width:540px){
    padding:8px 10px;
  }
`
const IconSearch = styled(FiSearch)`
  width:24px;
  height:24px;
  position:relative;
  display:block;
  color:#fff;
  @media(max-width:540px){
    width:19px;
    height:19px;
  }
`
const BoxInput = styled.div`
  width: 400px;
  display: flex;
  position:relative;
  align-items: center;
  @media(max-width:540px){
    margin-right:10px;
    margin-left:10px;
  }
`
const Input = styled.input`
  padding:10px 12px;
  font-size:18px;
  width: 100%;
  border:1px solid rgba( 0 0 0 /20%);
  outline:none;
  &:focus{
    border:1px solid rgba( 0 0 0 /90%);
  }
  @media(max-width:540px){
    padding:8px 10px;
    font-size:14px;
    &::placeholder{
      font-size:12px;
    }
  }
`
const MobileIconSearch = styled(FiSearch)`
  width:28px;
  height:28px;
  cursor:pointer;
  position:relative;
  box-sizing: border-box;
  color:#000;
  padding: 4px;
  &:hover{
    border-radius: 50%;
    padding: 4px;
    background-color: rgba(0 0 0 / 7%) ;
  }

`

const IconReset = styled(GrClose)`
  position:absolute;
  display:flex;
  margin-left:330px;
  color:#000;
  @media(max-width:450px){
    margin-left:212px;

  }
`
const TotalFavorite = styled.div`
  font-size:10px;
  width:20px;
  height:20px;
  border-radius:50%;
  padding:2px;
  background:black;
  text-align:center;
  color:#fff;
  position:absolute;
  margin-left:20px;
  margin-top:-6px;
  @media(max-width:540px){
    width:14px;
    height:14px;
    margin-left:18px;
    margin-top:-4px;
  }
`
const Logo = styled.a`
  font-size: 24px;
  font-weight: bold;
  font-family: "Fira Code";
  @media(max-width:540px){
    font-size: 18px;
  }
`;

const slideTopToBottom = keyframes`
  0%{
    transform:translateY(-500px)
  }
  100%{
    transform:translateY(0)
  }
`
const ClickMobileSearch = styled.div`
  width:350px;
  display:flex;
  /* display:${({display}) => (display)}; */
  position:absolute;
  align-items:center;
  box-sizing:border-box;
  height:100px;
  animation:2s ${slideTopToBottom} ease;
  transition:.8s;
  margin-top:500px;
`
const DivSearch = styled.div`
  width: calc(100% - 48px);
  position:absolute;
  margin-top:405px;
  background:#fff;
  height:360px;
  padding:0px 8px ;
  box-sizing:border-box;
  box-shadow:2px 2px 3px 3px rgba(0 0 0 /10%);
  display:flex;
  overflow-y:scroll;
  flex-direction:column;
  @media(max-width:540px){
    font-size:14px;
    margin-top:395px;
    width: calc(100% - 40px);
    box-shadow:-2px 2px -2px 1px rgba(0 0 0 /10%);

  }
`
const ListSearch = styled.li`
  padding:8px;
  list-style:none;
  box-sizing:border-box;
  font-weight:bold;
  cursor:pointer;
  color:rgba(0 0 0 /80%);
  &:hover{
    background:rgba(0 0 0 /04%);
  }
  @media(max-width:540px){
    font-size:14px;
  }
`
const Navbar = () => {
  const [search,setSearch] = useState()
  const [navbarShadow, setNavbarShadow] = useState(false)
  const [showInputSearch, setShowInputSearch] = useState(false)
  const [clickMobileIconSearch, setClickMobileIconSearch] = useState(false)
  const {searchInput,setLoading,getSneakers,setSearchInput,setResult,results,state} = useStateContext(search)
  const [autoComplete,setAutoComplete] = useState(false)
  const [suggestion,setSuggestion] = useState([])

  const brands = [
    "ASICS", "ADIDAS", "ALEXANDER MCQUEEN", "BAIT", "BALENCIAGA", "BURBERRY", "CHANEL", "COMMON PROJECTS", "CONVERSE", "CROCS","DIADORA","DIOR","GUCCI","JORDAN","LI-NING","LOUIS VUITTON","NEW BALANCE","NIKE","OFF-WHITE","PRADA","PUMA","REEBOK","SAINT LAURENT","SAUCONY","UNDER ARMOUR","VANS","VERSACE","YEEZY"
  ]




  const handleChangeSearch = (text) => {
    // const result = [
    //   {brand:"adidas"},
    //   {brand:"vans"},
    //   {brand:"puma"},
    //   {brand:"nike"},
    //   {brand:"speecs"},
    //   {brand:"speecs"},
    //   {brand:"speecs"},
    //   {brand:"speecs"},
    //   {brand:"speecs"},
    //   {brand:"geoff"},
    //   {brand:"aerostreet"},
    //   {brand:"kompas"},
    //   {brand:"new balance"},
    //   {brand:"rebook"}
    // ]
    let matches = []
    if(text.length > 0){
      matches = results?.results?.filter((d) => {
        const regex = new RegExp(`${text}`,"gi")
        return d.name.match(regex)
      })
    }
    console.log("match : ", matches)
    setSuggestion(matches)
    setSearch(text)
  }
  const onSuggest = (text) => {
    setSearch(text)
    setSearchInput(text)
    getSneakers(text)

    // if(searchInput){
    //     setSearchInput("")
    // }
    setAutoComplete(false)
  }

  const handleSearch = (e) => {
    if(e.key === "Enter"){
      if(searchInput){
        setSearchInput("")
      }
    setSearchInput(search)
    getSneakers(search)
    setAutoComplete(false)

    }
  }
  const handleClickSearch = () => {

    getSneakers(search)
    setSearchInput(search)
    setAutoComplete(false)

  }


  const handleClickAutoComplete = () => {
    setAutoComplete(!autoComplete)
  }
  const handleClickAutoCompleteDisabled = () => {
    setAutoComplete(false)
  }

  const handleReset = () => {
      setSearch('')
      setSuggestion([])
      setSearchInput("")
      setResult('')
  }

  const AddShadowNavbar = () => {
    if(typeof window !== "undefined"){
      if(window.scrollY >= 1 ){
        setNavbarShadow(true)
      }else{
        setNavbarShadow(false)
      }
    }
  }

  const handleShowInputSearch = () => {
    if(typeof window !== "undefined"){
      if(window.innerWidth <= 540 ){
        setShowInputSearch(true)
      }else{
        setShowInputSearch(false)
      }
    }
  }

const handleClickMobileIconSearch = () => {
  setClickMobileIconSearch(!clickMobileIconSearch)
}
  if( typeof window !== "undefined"){
    window.addEventListener('scroll', AddShadowNavbar)
  }
  if( typeof window !== "undefined"){
    window.addEventListener('resize', handleShowInputSearch)
  }

  return (
    <Div  background={navbarShadow ? "#fff" : ''} shadow={navbarShadow ? '0px 1px 4px 4px rgba(0 0 0 / 10%)' : ''}>
      <Link href="/sneaker" passHref>
      <a onClick={() => {setResult([]),setSearchInput("")}}>
        <IconLogoMobile />
      </a>
      </Link>
        <BoxInput>
          <Input onClick={handleClickAutoComplete} onKeyPress={(e) => handleSearch(e) } type="text" value={search} onChange={(e) => handleChangeSearch(e.target.value)} placeholder="Search sneaker your favorites..." required />
          { search ?
            <IconReset onClick={handleReset}/>
            : ""
          }

          {
            autoComplete ?
              <DivSearch>
                  { search ? (
                      suggestion && suggestion.map((s,i) => i < 100 && (
                        <ListSearch key={i} onClick={(e) => {handleSearch(e),onSuggest(s.name)}}>{s.name}</ListSearch>
                    ))):(
                    <>
                      <p><i> search by brands</i></p>
                      {brands.map((search,i) => (
                        <ListSearch key={i} onClick={(e) => {handleSearch(e),onSuggest(search)}}>{search}</ListSearch>
                      ))}
                    </>
                    )
                  }

              </DivSearch>
            : ""
          }
          <WrappIconSearch onClick={() => handleClickSearch()}>
            <IconSearch />
          </WrappIconSearch>
        </BoxInput>
      <Link href="/favorites"  passHref>
        <WrappIcon onClick={() => {setResult([]),setSearchInput("")}}>
        <Icon />
        <TotalFavorite>{state?.favorites?.favItems !== null ?  state?.favorites?.favItems.length : 0 }</TotalFavorite>
        </WrappIcon>
      </Link>
    </Div>
  );
};

export default Navbar;
