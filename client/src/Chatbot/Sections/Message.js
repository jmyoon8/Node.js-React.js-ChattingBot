import React from 'react';
import { Icon, Avatar } from 'antd';

require("../css/test.css");




function Message(props) {
   

    const AvatarSrc = props.who ==='Chat-Bot' ? <Icon type="robot" /> : <Icon type="smile" />  
    
    
    if(props.who==='Chat-Bot'){
        return (
            <ul className="sent">
                
                <p style={{fontSize:'20px',marginBottom:'0'}}> {<Avatar icon={AvatarSrc}/>}&nbsp;{props.who}</p>
                <li>
                    <pre className="p">{props.text}</pre>
                </li>
            </ul>
        )
    }else{

        return (
    
        <ul className="replies">
            <p className="r">{props.who}&nbsp;{<Avatar icon={AvatarSrc}/>}</p>
            <br/><br/>
            <li>
                <pre className="message">{props.text}</pre>
            </li>
        </ul>
        )
    }
}

export default Message
