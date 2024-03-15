import React from 'react'
import './maintain.css'
import logo from '../../assets/logo.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Maintain = () => {
  const {t} = useTranslation()
  return (
    <div className="containerr">
    <img src={logo} className="logo" alt='logo'/>
    <div  className='d-flex align-items-center justify-content-between m-auto text-content'>

    <div className="content">
        <p className='fs-1 fw-bold'>{t('MIGS Service is on its way')}</p>
        {/* <h1>{t("We're")} <span>{t('Launching')}</span> {('Soon')}</h1> */}
        <div className="launch-time">
           <Link className='bg-primary bg-gradient p-3 text-light text-decoration-none rounded-pill' to="/">Back To Home</Link>
        </div>
    </div>
    <div>
    <svg class="pl" width="340" height="340" viewBox="0 0 240 240">
	<circle class="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
	<circle class="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
	<circle class="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
	<circle class="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
</svg>
    </div>
    </div>
</div>
  )
}

export default Maintain