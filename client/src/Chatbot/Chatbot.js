import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Message from './Sections/Message';
import { List, Icon, Avatar } from 'antd';
import Card from "./Sections/Card";







function Chatbot() {
  

    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)
    //페이지가 시작되면 실행되는 인텐스 지정
    useEffect(() => {

        eventQuery('welcomeChatBot')

    }, [])
    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: '고객님',
            content: {
                text: {
                    text: text
                }
            }
        }
        dispatch(saveMessage(conversation))
        // console.log('text I sent', conversation)

        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            for (let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'Chat-Bot',
                    content: content
                }
                dispatch(saveMessage(conversation))
            }
        } catch (error) {
            conversation = {
                who: 'Chat-Bot',
                content: {
                    text: {
                        text: "오류가 발생했습니다."
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }
    }
    const eventQuery = async (event) => {
        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'Chat-Bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }
        } catch (error) {
            let conversation = {
                who: 'Chat-Bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

    }
    const keyPressHanlder = (e) => {
        
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('질문을 입력해주세요!')
            }

            //we will send request to text query route 
            textQuery(e.target.value)


            e.target.value = "";
        }
    }
    const renderCards = (cards) => {
        return cards.map((card,i) => <Card key={i} cardInfo={card.structValue} />)
    }
    const renderOneMessage = (message, i) => {
        console.log('message', message)
        // we need to give some condition here to separate message kinds 
        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />
        } else if (message.content && message.content.payload.fields.card) {
            const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />
            return <div>
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderCards(message.content.payload.fields.card.listValue.values)}
                    />
                </List.Item>
            </div>
        }
       // template for card message 
    }

    const renderMessage = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }


    return (
        <div id="msgdiv" style={{
            height: 507, width: 600,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div class="msgdiv" style={{ height: 450, width: '100%', overflow: 'auto' }}>
                

                {renderMessage(messagesFromRedux)}


            </div>
                <input
                    style={{
                        margin: 0, width: '100%', height: 50,
                        borderRadius: '4px', padding: '5px', fontSize: '1rem'
                    }}
                    placeholder="말씀해주세요!"
                    onKeyPress={keyPressHanlder}
                    type="text"
                />
            

        </div>
    )
}


export default Chatbot;
