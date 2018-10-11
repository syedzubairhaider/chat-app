import React from 'react';

const Message = ({sess,message}) => <li style={{color:`#${message.user}`}} className="message" > {message.user} : {message.msg}  </li>

export default Message;
