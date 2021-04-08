import React from 'react'
import CaseCountry from './CaseCountry'
import Information from './Information'


import './sidebar.css'

function Sidebar({ data }) {
    return (
        <div className="sidebar">
            <CaseCountry data={data} className="sidebar__country" />
            {/* <LineMap /> */}
            <Information />
        </div>
    )
}

export default Sidebar
