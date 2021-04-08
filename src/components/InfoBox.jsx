import { CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './box.css'

function InfoBox({ title, cases, total, type, icon, ...props }) {
    return (
        <div>
            <div className="box__card" onClick={props.onClick}>
                <CardContent className="card__content" >
                    <p className="icon"> { icon } </p>
                    <h5> { type } </h5>
                    <Typography className="title" > { title } </Typography>

                    <h2 className="cases" > { cases } </h2>

                    <Typography className="total" > { total } </Typography>
                    
                </CardContent>
            </div>
        </div>
    )
}

export default InfoBox
