import React from 'react';

const Message = ({sess,message}) => <li style={{color:message.user==sess?"black":"blue"}} className="message" > {message.user} : {message.msg}  </li>


export default Message;
