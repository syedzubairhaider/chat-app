import React from 'react';

const Message = ({message,item}) => <span> <li className="message" > {message.user} : {message.msg}  </li></span>


export default Message;
