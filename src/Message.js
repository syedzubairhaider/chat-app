import React from 'react';

const Message = ({ message, item }) => < span > < li className = "message" > me: { message.msg } < /li> < li className = "message" > bot: { message.user } < /li> </span >


    export default Message;
