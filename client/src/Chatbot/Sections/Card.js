import React from 'react'
import { Card, Icon } from 'antd';

const { Meta } = Card;

function CardComponent(props) {
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt={props.cardInfo.fields.description.stringValue}
                    src={props.cardInfo.fields.image.stringValue} style={{width:"50px",height:"50px",marginLeft:"55px",marginTop:"10PX"}}/>
            }
            actions={[
                <a target="_blank" rel="noopener noreferrer" href={props.cardInfo.fields.link.stringValue}>
                    <Icon type="ellipsis" key="ellipsis" />
                </a>
            ]}
        >
            <Meta
                title={props.cardInfo.fields.stack.stringValue}
                description={props.cardInfo.fields.description.stringValue}
            />

        </Card>

    )
}

export default CardComponent
