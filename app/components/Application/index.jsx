import React from 'react';
import bemCl from 'bem-cl';
import './Application.scss';
import { Layout, Menu, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import CreateProject from '../CreateProject';

import 'antd/dist/antd.css';

const b = bemCl('j-application');

class Application extends React.PureComponent {
    
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <div className="logo" />
                    <div>
                    
                    </div>
                </Sider>
                <Layout>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <CreateProject />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        SMD box © 2017
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Application;
