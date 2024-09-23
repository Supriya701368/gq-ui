import { gql } from "@apollo/client";
export const GET_STUDENTS = gql`
  query GetStudents {
  getStudents {
    name
    rno
    loc
    _id
  }
}
`;