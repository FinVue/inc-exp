import React, { PureComponent } from 'react'
import Navbar from '../components/MainNavbar';

export default class tax_calc extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
        <h1>Tax calculator</h1>
      </div>
    )
  }
}
