import { request, gql } from 'graphql-request'

const MASTER_URL = "https://api-ap-northeast-1.hygraph.com/v2/cls1iwu5p2rb301utqytbp6ee/master"

const getSlider = async ()=>{
    const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
      
      
  `;
  const result=await request(MASTER_URL, query)
  return result;
}

export default{
    getSlider
}

