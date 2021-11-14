import { gql } from "@apollo/client";

export const LOAD_HEROS = gql`
  query {
    allPeople {
      edges {
        node {
          name, 
          birthYear, 
          gender, 
          homeworld {
            name
          }, 
          species {
            name
          }
        }
      }
    }
  } 
`;
