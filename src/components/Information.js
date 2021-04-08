import { Button } from '@material-ui/core'
import React from 'react'
import pandemic from '../images/covid.svg'

function Information() {
    return (
        <div className="info">
            <div className="info__img">
                <img src={pandemic} alt="Covid Images"/>
            </div>
            <div className="info__text">
                <h4>Symptoms of Covid-19</h4>
                <p>Coronavirus diseases (COVID-19) is an infectious diseases</p>
                <div>

                <Button variant="outlined">Read More</Button>
                </div>
            </div>
        </div>
    )
}

export default Information
