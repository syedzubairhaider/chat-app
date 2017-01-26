import React from 'react';

const Message = ({message}) => <li className="message" > {message.user} : {message.msg}  </li>


export default Message;
