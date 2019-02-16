import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Redirect, withRouter } from "react-router-dom";

import { Menu, Icon, Container, Button, Header, Dimmer, Message, Grid, Form, Segment, Input, Divider, Label, Loader} from 'semantic-ui-react'

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
    }

    componentDidUpdate(){
        console.log('resource componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    // have to add a new character when have a new character
    SehaDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Seha", acceptedFiles);
    }

    SylviDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Sylvi", acceptedFiles);

    }
    
      
    render() {
        {/* css for image thumb */}
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
            width: 200,
            height: 200,
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
        
        const { authenticated, userInfo, Seha,Sylvi, error, loading } = this.store;
        
        const ErrorView = (
            <Message error visible size='tiny'>{error}</Message>
        );

        const loaderView = (
            <Dimmer active inverted>
                <Loader size='huge'></Loader>
            </Dimmer>
        )
        
        const Sehathumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={Seha} style={img} />
                </div>
                </div>
            </aside>
        );

        const Sylvithumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={Sylvi} style={img} />
                </div>
                </div>
            </aside>
        );

        const Yuri = React.createRef();
        const Misteltein = React.createRef();


        return (
            <Container  style={{ marginTop: '5em', width: '90%'  }}>

                { loading === 'on' ? loaderView : null  }
                
                <Grid style={{ height: '100%' }} verticalAlign='middle' >
                    <Grid.Column>
                        <Header as='h2' textAlign='center'>Register a Resource</Header>
						<Form size='large'>
                            <Segment>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Sheet</label>
                                        <Input 
                                            placeholder='Input sheet name'
                                            name='displayname'
                                            value={userInfo.displayname} 
                                            onChange={this.handleInputDisplayName}
                                        />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Memo</label>
                                        <Input 
                                            placeholder='memo'
                                            name='memo'
                                            value={userInfo.displayname} 
                                            onChange={this.handleInputDisplayName}
                                        />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Seha</label>
                                        <Dropzone
                                            onDrop={this.SehaDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>

                                        { Seha !== '' ? Sehathumbs : null }

                                    </Form.Field>

                                    <Form.Field>
                                        <label>Sylvi</label>
                                        <Dropzone
                                            onDrop={this.SylviDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { Sylvi !== '' ? Sylvithumbs : null }
                                    </Form.Field>
                                    
                                    <Form.Field>
                                        <label>Yuri</label>
                                        {/* Yuri */}
                                        <Dropzone
                                            ref={Yuri}
                                            onDrop={this.onDrop}
                                            disableClick
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                    <p>Drop files here</p>

                                                    <button type="button" onClick={() => Yuri.current.open()}>
                                                    Open File Dialog
                                                    </button>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Misteltein</label>
                                        {/* seha */}
                                        <Dropzone
                                            ref={Misteltein}
                                            onDrop={this.onDrop}
                                            disableClick
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                    <p>Drop files here</p>

                                                    <button type="button" onClick={() => Misteltein.current.open()}>
                                                    Open File Dialog
                                                    </button>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </Form.Field>
                                    
                                </Form.Group>
                                
                                
                                {/* original dropzone 
                                <Dropzone onDrop={this.onDrop}>
                                    {({getRootProps, getInputProps, isDragActive}) => {
                                        return (
                                                <div
                                                {...getRootProps()}
                                                className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                                                >
                                                <Segment>
                                                    <Header icon>
                                                    <Icon name='file image outline' />
                                                    <input {...getInputProps()} />
                                                        {
                                                            isDragActive ?
                                                            <p>Drop files here...</p> :
                                                            <p>Try dropping a image files here, or click to select files to upload.</p>
                                                        }
                                                    </Header>
                                                </Segment>
                                                
                                            </div>
                                        )
                                    }}
                                </Dropzone>
                                */}

                                <Form.Field>
                                    <div>
                                        { error !== null ? ErrorView : null }
                                    </div>
                                </Form.Field>
                                           
                                
                                <hr/>

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