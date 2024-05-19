import React, { PureComponent } from 'react'
import Navbar from '../components/MainNavbar';

export default class inc_exp extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
        <h1>Income & expense Calc</h1>
      </div>
    )
  }
}
