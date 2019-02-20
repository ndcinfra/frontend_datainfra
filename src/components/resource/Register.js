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
        this.store.clearResourceInfo();
        
        console.log('constructor');

        //for checking auth whe reload
        //this.store.checkAuth();

        //TODO: clear resource
        
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

    // TODO: find !!! more efficent way. !
    // have to add a new character when have a new character
    /*
        Seha       string `orm:"size(2000);null" json:"seha"`
	    Sylvi      string `orm:"size(2000);null" json:"sylvi"`    
        Yuri       string `orm:"size(2000);null" json:"yuri"`
        Misteltein string `orm:"size(2000);null" json:"misteltein"`
        Jay          string `orm:"size(2000);null" json:"j"`
        Harpy      string `orm:"size(2000);null" json:"harpy"`
        Levia      string `orm:"size(2000);null" json:"levia"`
        Nata       string `orm:"size(2000);null" json:"nata"`
        Tina       string `orm:"size(2000);null" json:"tina"`
        Violet     string `orm:"size(2000);null" json:"violet"`
        Wolfgang   string `orm:"size(2000);null" json:"wolfgang"`
        Soma       string `orm:"size(2000);null" json:"soma"`
        Luna       string `orm:"size(2000);null" json:"luna"`
        */

    SehaDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Seha", acceptedFiles);
    }

    SylviDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Sylvi", acceptedFiles);
    }

    YuriDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Yuri", acceptedFiles);
    }

    MistelteinDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Misteltein", acceptedFiles);
    }

    JayDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Jay", acceptedFiles);
    }

    HarpyDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Harpy", acceptedFiles);
    }

    LeviaDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Levia", acceptedFiles);
    }

    NataDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Nata", acceptedFiles);
    }

    TinaDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Tina", acceptedFiles);
    }

    VioletDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Violet", acceptedFiles);
    }
    
    WolfgangDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Wolfgang", acceptedFiles);
    }

    SomaDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Soma", acceptedFiles);
    }

    LunaDrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("Luna", acceptedFiles);
    }

    MaleADrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("MaleA", acceptedFiles);
    }

    FemaleADrop = (acceptedFiles, rejectedFiles) => {
        // Do something with files
        this.store.GetImgUrl("FemaleA", acceptedFiles);
    }

    handelRegister(e){
		e.preventDefault();
        this.store.setLoading('on');

        const {history, lastLocation} = this.props;
        this.store.RegisterResource(history, lastLocation);
    }

    handleInputSheet = (e, { value }) => {
        this.store.resources.sheet = value;
    }

    handleInputMemo = (e, { value }) => {
        this.store.resources.memo = value;
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
        
        const { authenticated, userInfo, error, loading } = this.store;
        const {resources} = this.store;

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
                    <img src={resources.seha} style={img} />
                </div>
                </div>
            </aside>
        );

        const Sylvithumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.sylvi} style={img} />
                </div>
                </div>
            </aside>
        );

        const Yurithumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.yuri} style={img} />
                </div>
                </div>
            </aside>
        );

        const Mistelteinthumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.misteltein} style={img} />
                </div>
                </div>
            </aside>
        );

        const Jaythumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.jay} style={img} />
                </div>
                </div>
            </aside>
        );
        
        const Harpythumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.harpy} style={img} />
                </div>
                </div>
            </aside>
        );
        
        const Leviathumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.levia} style={img} />
                </div>
                </div>
            </aside>
        );

        const Natathumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.nata} style={img} />
                </div>
                </div>
            </aside>
        );

        const Tinathumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.tina} style={img} />
                </div>
                </div>
            </aside>
        );

        const Violetthumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.violet} style={img} />
                </div>
                </div>
            </aside>
        );

        const Wolfgangthumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.wolfgang} style={img} />
                </div>
                </div>
            </aside>
        );

        const Somathumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.soma} style={img} />
                </div>
                </div>
            </aside>
        );

        const Lunathumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.luna} style={img} />
                </div>
                </div>
            </aside>
        );

        const Malethumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.maleacc} style={img} />
                </div>
                </div>
            </aside>
        );

        const Femalethumbs = (
            <aside style={thumbsContainer}>
                <div style={thumb}>
                <div style={thumbInner}>
                    <img src={resources.femaleacc} style={img} />
                </div>
                </div>
            </aside>
        );

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
                                            placeholder='Input sheet'
                                            name='sheet'
                                            value={resources.sheet} 
                                            onChange={this.handleInputSheet}
                                        />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Memo</label>
                                        <Input 
                                            placeholder='Input memo'
                                            name='memo'
                                            value={resources.memo} 
                                            onChange={this.handleInputMemo}
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

                                        { resources.seha !== '' ? Sehathumbs : null }

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
                                        { resources.sylvi !== '' ? Sylvithumbs : null }
                                    </Form.Field>
                                    
                                    <Form.Field>
                                        <label>Yuri</label>
                                        <Dropzone
                                            onDrop={this.YuriDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.yuri !== '' ? Yurithumbs : null }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Misteltein</label>
                                        <Dropzone
                                            onDrop={this.MistelteinDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.misteltein !== '' ? Mistelteinthumbs : null }
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>J</label>
                                        <Dropzone
                                            onDrop={this.JayDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.jay !== '' ? Jaythumbs : null }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Harpy</label>
                                        <Dropzone
                                            onDrop={this.HarpyDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.harpy !== '' ? Harpythumbs : null }
                                    </Form.Field>
                                    
                                    <Form.Field>
                                        <label>Levia</label>
                                        <Dropzone
                                            onDrop={this.LeviaDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.levia !== '' ? Leviathumbs : null }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Nata</label>
                                        <Dropzone
                                            onDrop={this.NataDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.nata !== '' ? Natathumbs : null }
                                    </Form.Field>

                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Tina</label>
                                        <Dropzone
                                            onDrop={this.TinaDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.tina !== '' ? Tinathumbs : null }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Violet</label>
                                        <Dropzone
                                            onDrop={this.VioletDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.violet !== '' ? Violetthumbs : null }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Wolfgang</label>
                                        <Dropzone
                                            onDrop={this.WolfgangDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.wolfgang !== '' ? Wolfgangthumbs : null }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Soma</label>
                                        <Dropzone
                                            onDrop={this.SomaDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.soma !== '' ? Somathumbs : null }
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Luna</label>
                                        <Dropzone
                                            onDrop={this.LunaDrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.luna !== '' ? Lunathumbs : null }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Male Accessory</label>
                                        <Dropzone
                                            onDrop={this.MaleADrop}
                                            >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.maleacc !== '' ? Malethumbs : null }
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Female Accessory</label>
                                        <Dropzone onDrop={this.FemaleADrop} >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drop files here or click to select file</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        { resources.femaleaccs !== '' ? Femalethumbs : null }
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
									<Button color='violet' fluid size='small' onClick={this.handelRegister.bind(this)}>Register</Button>
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