import React, { Component } from 'react';
import Alert from './Alert/Alert';
import Layout from './Layout/Layout';

export default class Home extends Component {
    render() {
        return (
            <Layout>
                <div>
                    <p>Home</p>
                    <Alert message="Oi" onClose={() => this.close()} />
                </div>
            </Layout>
        )
    }

    close() {
        throw new Error('Method not implemented.');
    }
}
