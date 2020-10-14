import React from 'react'
import { Card, Icon } from 'antd';

require("../css/test.css");
const { Meta } = Card;

function CardComponent(props) {
    return (
        <Card
            style={{ width: 105,height:123 }}
            cover={
                <a target="_blank" style={{margin:'0px auto',width:'70px',height:'110px'}} rel="noopener noreferrer" href={props.cardInfo.fields.link.stringValue}>
             
                    <img className="card"
                        alt={props.cardInfo.fields.description.stringValue}
                        src={props.cardInfo.fields.image.stringValue} />
                       <div className="text">{props.cardInfo.fields.description.stringValue}</div>
                </a>
            }
        >
       </Card>

    )
}

export default CardComponent
