const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVzdGhlciIsImlzQWRtaW4iOnRydWUsImVtYWlsIjpudWxsLCJpYXQiOjE1NzY2MDA5Mzh9.GmXpZtctlfN4cMZrIOXxm3UABfqak3rMO9osiFF79L0"; //localStorage.getItem('token');

const host = "http://localhost:3000";

const myFetch = async (path: string) =>
  (
    await fetch(host + path, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
  ).json();

export const getUsers = async () => await myFetch("/users");

export const getBooksByUserId = async (id_users: number) =>
  await myFetch(`/users/${id_users}/books`);


// export const getBooksForUserId = async (id_users: number) => {
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVzdGhlciIsImlzQWRtaW4iOnRydWUsImVtYWlsIjpudWxsLCJpYXQiOjE1NzY2MDA5Mzh9.GmXpZtctlfN4cMZrIOXxm3UABfqak3rMO9osiFF79L0"; //localStorage.getItem('token');
//     const response = await fetch(`http://localhost:3000/users/${id_users}/books`, {
//         headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     })
//       const books = await response.json()
//       return books
//   }

// export const getUsers = async () => {
//   const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVzdGhlciIsImlzQWRtaW4iOnRydWUsImVtYWlsIjpudWxsLCJpYXQiOjE1NzY2MDA5Mzh9.GmXpZtctlfN4cMZrIOXxm3UABfqak3rMO9osiFF79L0"; //localStorage.getItem('token');
//     const response = await fetch("http://localhost:3000/users", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     })
//     const users = await response.json()
//     return users;
// }

