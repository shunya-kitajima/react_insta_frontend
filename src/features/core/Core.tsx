import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import Auth from '../auth/Auth'
import styles from './Core.module.css'

const Core: React.FC = () => {
  return (
    <div>
      <Auth />
    </div>
  )
}

export default Core
