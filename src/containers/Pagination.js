import React , {Component} from 'react';

class Pagination extends Component {

  constructor(props){
    super(props);
  }

  paginate = (number) => { this.props.paginate(number);  }
  
  render() {

  
    if (this.props.currentPage == 1) { this.previospage = 1; this.nextpage = 2; }
    else { this.previospage = this.props.currentPage - 1; this.nextpage = this.props.currentPage + 1; }

    return (
      <nav className='d-flex align-items-center justify-content-center mtop'>
        <ul className='pagination'>
          <li className='page-item'>
            <a onClick={() => this.paginate(this.previospage)} href="#" className='page-link fontcolor'>
              Previos
            </a>
          </li>
          <li className='page-item'>
            <a onClick={() => this.paginate(this.nextpage)} href="#" className='page-link fontcolor'>
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;