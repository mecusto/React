
const host = "http://localhost:3000"

const myFetch = async (path: string, method: string, token:string) => 
    ( 
        await fetch(host + path, {
            method: method,
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
        })
    ).json();

export const getUsers = async (token: any) => await myFetch('/users', 'get', token);
     
export const getBooksUserById = async (id_user: number, token: any) => 
    await myFetch(`/users/${id_user}/books`, 'get', token) ;
    
export const getBooks = async (token: any) => await myFetch('/books', 'get', token);

export const postBook = async (id_user: number, book_code: number, token: any) => 
    await myFetch(`/users/${id_user}/books/${book_code}`, 'post', token);