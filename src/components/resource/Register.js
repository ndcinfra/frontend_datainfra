import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Redirect, withRouter } from "react-router-dom";

import { Icon, Container, Button, Header, Dimmer, Message, Grid, Form, Segment, Input, Divider, Label, Loader} from 'semantic-ui-react'

import classNames from 'classnames'
import Dropzone from 'react-dropzone'

@inject("store")
@observer
class Register extends Component {
    
    constructor(props) {
        super(props);
        this.store = this.props.store.appState;
        console.log('constructor');

        //for checking auth whe reload
        //this.store.checkAuth();
        
        // direct input & reload
        if (this.store.authenticated !== true) {
			const {history} = this.props;
			//this.store.setSuccessFlashMessage('You need logged in.');
            history.push('/login');
		}
    }

    componentDidMount() {
        console.log('componentDidMount');

        //this.authenticate();
        console.log("register.js: ", this.store.authenticated);
    }

    componentDidUpdate(){
        console.log('resource rigister componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    
    onDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl(acceptedFiles);

      }
      
    render() {
        const { authenticated, userInfo, imgUrl, error, loading } = this.store;
        
        const ErrorView = (
            <Message error visible size='tiny'>{error}</Message>
        );

        const loaderView = (
            <Dimmer active inverted>
                <Loader size='huge'></Loader>
            </Dimmer>
        )

        const thumbsContainer = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 16
        };


        const thumb = {
            display: 'inline-flex',
            borderRadius: 2,
            border: '1px solid #eaeaea',
            marginBottom: 8,
            marginRight: 8,
            width: 300,
            height: 300,
            padding: 4,
            boxSizing: 'border-box'
        };
        
        const thumbInner = {
            display: 'flex',
            minWidth: 0,
            overflow: 'hidden'
        }
        
        const img = {
            display: 'block',
            width: 'auto',
            height: '100%'
        };
        
        const thumbs = (
            <div style={thumb}>
            <div style={thumbInner}>
                <img
                src={imgUrl}
                style={img}
                />
            </div>
            </div>
        );

        return (
            <Container text style={{ marginTop: '5em' }}>
                { loading === 'on' ? loaderView : null  }
                
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' >
                    <Grid.Column style={{ maxWidth: 700 }}>
                        <Header as='h2' textAlign='center'>Register a Resources</Header>
						<Form size='large'>
                            <Segment>
								<Form.Field>
									<Input 
										icon='user' 
										iconPosition='left' 
										placeholder={authenticated}
										name='displayname'
										value={userInfo.displayname} 
                            			onChange={this.handleInputDisplayName}
									/>
                                </Form.Field>
                                <Form.Field>
                                    <div>
                                        { error !== null ? ErrorView : null }
                                    </div>
                                </Form.Field>
                                
                                <Dropzone onDrop={this.onDrop}>
                                    {({getRootProps, getInputProps, isDragActive}) => {
                                        return (
                                                <div
                                                {...getRootProps()}
                                                className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                                                >
                                                <Segment placeholder>
                                                    <Header icon>
                                                    <Icon name='file image outline' />
                                                    <input {...getInputProps()} />
                                                        {
                                                            isDragActive ?
                                                            <p>Drop files here...</p> :
                                                            <p>Try dropping some files here, or click to select files to upload.</p>
                                                        }
                                                    </Header>
                                                </Segment>
                                                
                                            </div>
                                        )
                                    }}
                                </Dropzone>
                                
                                <aside style={thumbsContainer}>
                                    {thumbs}
                                </aside>

								<div>
									<Button color='violet' fluid size='small'>Register</Button>
								</div>
							</Segment>
                        </Form>
					</Grid.Column>
                </Grid>
                
            </Container>

            
        );
    }
}

export default Register;