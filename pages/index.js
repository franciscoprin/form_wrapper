import React from 'react';
import {WithData} from '../lib';
import {Email, Comments, Form, Button, Text} from '../components';

class Index extends React.Component {
    render () {
        return (
          <Form>
            <Text id="subject">Name</Text>
            <Text id="name">Name</Text>
            <Email id="sender">sender@email.com</Email>
            <Email id="receiver">receiver@email.com</Email>
            <Comments id="comments">Comment</Comments>
            <Button submit>Summit</Button>
          </Form>
        )
    }
}

export default WithData(Index);