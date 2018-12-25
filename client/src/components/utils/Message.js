import React from "react";
import { Message } from "semantic-ui-react";

const Notification = () => (
  <Message>
    <Message.Header>Changes in Service</Message.Header>
    <p>
      We updated our privacy policy here to better service our customers. We
      recommend reviewing the changes.
    </p>
  </Message>
);

export default Notification;