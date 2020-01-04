import React from "react";
import IBooks from './IBooks';


interface IProps {
  books: IBooks[];
  
}

interface IState {}

class TablaBooks extends React.Component<IProps, IState> {
  render() {
    const { books } = this.props;
    if (books.length === 0 ){
      return null;
    }
    
    return (       
        <table>
          <tr>
            <th>book_code</th>
            <th>title</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>year_written</th>
            <th>price</th>
          </tr>
      
        {books.map(({book_code, title, first_name,last_name, year_written, price}) => {
          return(
          <tr key={book_code} >
            <td>{book_code}</td>
            <td>{title}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{year_written}</td>
            <td>{price}</td>
          </tr>
          )
        })}
      </table>
    )
  }
}

export default TablaBooks;
