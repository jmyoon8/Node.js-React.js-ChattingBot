import React from 'react'
import { List, Icon, Avatar } from 'antd';

function Message(props) {

    const AvatarSrc = props.who ==='Chat-Bot' ? <Icon type="robot" /> : <Icon type="smile" />  
    // var float='right'
    // const fl=props.who==='Chat-Bot'?float='left' :float='right'
    
    return (
    
    
        <List.Item style={{ padding: '1rem', /*float:fl,width:'25rem',*/fontSize:'10px'}} >
            <List.Item.Meta
                
                title={props.who}
                description={props.text}
                avatar={<Avatar icon={AvatarSrc} />}
            />
            
        </List.Item>
        
    )
}

export default Message
