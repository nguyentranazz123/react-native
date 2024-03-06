import { request, gql } from 'graphql-request'

const MASTER_URL = "https://api-ap-northeast-1.hygraph.com/v2/cls1iwu5p2rb301utqytbp6ee/master"

const getSlider = async () => {
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
  const result = await request(MASTER_URL, query)
  return result;
}
const getCategories = async () => {
  const query = gql`
  query GetCategory {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
`;
  const result = await request(MASTER_URL, query)
  return result;
}
const getBusinessList = async () => {
  const query = gql`
  query getBusinessList {
    businessLists {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
`;
  const result = await request(MASTER_URL, query)
  return result;
}
const getBusinessListByCategory = async (category) => {
  const query = gql`
  query getBusinessList {
    businessLists(where: {category: {name: "${category}"}}) {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  
`;
  const result = await request(MASTER_URL, query)
  return result;
}
const getUserBookings = async (userEmail) => {
    const query = gql`
    query GetUserBookings {
      bookings(orderBy: updatedAt_DESC, where: {userEmail: "${userEmail}"}) {
        id
        date
        time
        userName
        userEmail
        bookingStatus
        businessList {
          id
          contactPerson
          email
          name
          address
          images {
            url
          }
          about
          category {
            name
          }
        }
      }
    }
    
    `
    const result = await request(MASTER_URL, query)
  return result;
}

const createBooking = async (data) => {
  const mutationQuery = gql`
  mutation createBooking {
    createBooking(
      data: {bookingStatus: Booked, businessList: 
        {connect: {id: "${data.businessId}"}}, 
        date: "${data.date}",
        time: "${data.time}", 
        userName: "${data.userName}", 
        userEmail: "${data.userEmail}"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, mutationQuery)
  return result;
}

export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings
}

