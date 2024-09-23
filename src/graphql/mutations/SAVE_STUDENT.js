import { gql } from "@apollo/client";

export const SAVE_STUDENT = gql`
mutation Mutation($data: StudentInput) {
  saveStudent(data: $data)
}
`