import React from 'react'
import './AddStoryWindow.css'
import {Modal, Form, FormGroup, Icon, IconButton, Input, FormControl,ControlLabel, ButtonToolbar,
    Button, InputNumber, Tag, TagGroup} from "rsuite";
import Story from '../../entities/Story'
import GeoCodeService from '../GoogleMapsService/GeoCodeService'
export default class AddStoryWindow extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            typing: false,
            inputValue: '',
            author:'',
            title:'',
            story:'',
            medium:'',
            year:2019,
            tags: [],
            address:this.props.address,
            latlng: this.props.latlng,
            imageUrl: ''
        };

        this.propsAddress = this.props.address;
        this.toggle = this.props.toggle;
        this.onSubmitStory = this.props.onSubmitStory;
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
    }
    handleButtonClick() {
        this.setState(
            {
                typing: true
            },
            () => {
                this.input.focus();
            }
        );
    }
    handleInputChange(inputValue) {
        this.setState({ inputValue });
    }
    handleInputConfirm() {
        const { inputValue, tags } = this.state;
        const nextTags = inputValue ? [...tags, inputValue] : tags;
        this.setState({
            tags: nextTags,
            typing: false,
            inputValue: ''
        });
    }
    handleTagRemove(tag) {
        const { tags } = this.state;
        const nextTags = tags.filter(item => item !== tag);
        this.setState({
            tags: nextTags
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let address = nextProps.address;
        let latlng = nextProps.latlng;
        this.setState({address,latlng});
    }

    renderInput() {
        const { typing, inputValue } = this.state;

        if (typing) {
            return (
                <Input
                    className="tag-input"
                    inputRef={ref => {
                        this.input = ref;
                    }}
                    size="xs"
                    style={{ width: 70 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                />
            );
        }

        return (
            <IconButton
                className="tag-add-btn"
                onClick={this.handleButtonClick}
                icon={<Icon icon="plus" />}
                appearance="ghost"
                size="xs"
            />
        );
    }

    onInputChanged(text, e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onYearChanged(year){
        this.setState({year});
    }

    submit(latlng) {
        let color = (this.state.medium && this.state.medium !== '') || (this.state.imageUrl && this.state.imageUrl !== '')  ? 'pink' : 'yellow';
        let max = 8, min = 1;
        let shapeNumber = Math.floor(Math.random() * (+max - +min)) + +min;
        let iconPath = 'spots/'+ color +'/spot '+ shapeNumber+'.svg';

        let story = new Story(this.state.title, this.state.author, this.state.year, this.state.medium, this.state.story,
            //tags,         address,            position           icon
            this.state.tags, this.state.address, latlng, iconPath, this.state.imageUrl);
        this.onSubmitStory(story);
        console.log(this.state.author, this.state.title, this.state.address, this.state.medium, this.state.year, latlng);
    }

    handleAddressError(address){
        if(!address) {
            console.error("address is null");
            return;
        }
        const {street, number, city} = address.split(',');
        const rearrangedAddress = [city, street, number].join(', ');
        console.log(rearrangedAddress);
        GeoCodeService.fromAddress(rearrangedAddress)
            .then(response => {
                    console.log(this.state.address);
                    this.submit(response.results[0].geometry.location);
                },
                error => {

                    console.error(error);
                });

    }

    submitNewStory(){

        if(this.props.latlng) {
            this.submit(this.state.latlng);
        }
        else{

            GeoCodeService.fromAddress(this.state.address)
                .then(response => {
                        console.log(this.state.address);
                        this.submit(response.results[0].geometry.location);
                    },
                    error => {
                        this.handleAddressError(this.state.address);
                    });

        }
    }

    checkImageUploadResult(resultEvent){
        if(resultEvent.event === 'success'){
            this.setState({imageUrl: resultEvent.info.secure_url});
        }
    }

    render() {
        const { tags } = this.state;
        const propsAddress = this.props.address;

        let onResult = (error, result) => this.checkImageUploadResult(result);
        let widget = window.cloudinary.createUploadWidget({
            cloudName:'roiedanino',
            uploadPreset: 'aah4gzsx'},
            onResult
        );
        this.showWidget = () => widget.open();
        return (
            <div className={'withFont'} style={{width: '600px'}}>
                <Modal.Header>

                        <h1> הוסיפו סיפור</h1>
                        {<h5 className={"address"}>
                            <img src={'spots/blue/spot 5.svg'} style={{width:'30px', height:'30px'}}
                                alt={'location logo'}
                            />
                            {this.state.address}
                        </h5>}


                </Modal.Header>

                <Modal.Body >
                    <Form fluid>
                        <FormGroup>
                            <ControlLabel className={"formLabel"}>מחבר</ControlLabel>
                            <FormControl accepter={undefined} name="author" value={this.state.author} onChange={this.onInputChanged.bind(this)}/>
                        </FormGroup>
                        {!propsAddress &&
                            <FormGroup>
                                <ControlLabel className={"formLabel"}>כתובת</ControlLabel>
                                <FormControl accepter={undefined} name="address" value={this.state.address}
                                             placeholder={"תל אביב בן יהודה 126"}
                                             onChange={this.onInputChanged.bind(this)}/>
                            </FormGroup>
                        }
                        <FormGroup>
                            <ControlLabel className={"formLabel"}>כותרת</ControlLabel>
                            <FormControl accepter={undefined} name="title" value={this.state.title} onChange={this.onInputChanged.bind(this)}/>
                        </FormGroup>
                        <FormGroup className={"yearInput"}>
                            <ControlLabel className={"formLabel"} >שנה</ControlLabel>
                            <InputNumber  name={"year"} defaultValue={2019} max={2019} min={1900}
                                          value={this.state.year}
                                          onChange={this.onYearChanged.bind(this)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className={"formLabel"} >תמונה</ControlLabel>
                            <Button onClick={this.showWidget.bind(this)} >העלה תמונה</Button>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className={"formLabel"} >קישור לסרטון</ControlLabel>
                            <Input accepter={undefined} name="medium" value={this.state.medium}
                                         placeholder='https://www.youtube.com/watch?v=kn9ryAm3kaI'

                                         onChange={this.onInputChanged.bind(this)}/>
                        </FormGroup>


                        <FormGroup>
                            <ControlLabel className={"formLabel"} >הסיפור שלך</ControlLabel>
                            <FormControl accepter={undefined} name="story" rows={5} componentClass="textarea" value={this.state.story}
                                         onChange={this.onInputChanged.bind(this)}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className={"formLabel"} >&nbsp;# תגיות:  &nbsp;</ControlLabel>
                            <TagGroup>
                                {tags.map((item, index) => (
                                    <span key={index}>
                                        <Tag
                                            className={'fill-color'}
                                            closable
                                            onClose={() => {
                                                this.handleTagRemove(item);
                                            }}
                                        >
                                            {item}
                                        </Tag>
                                        &nbsp;
                                    </span>
                                ))}
                                {this.renderInput()}
                            </TagGroup>
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar className={"formLabel"}>
                                <Button appearance="default" onClick={() => this.toggle()} >חזור</Button>
                                <Button className={'fill-color'} appearance="primary" onClick={() => this.submitNewStory()}>הוסף</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </div>
        );
    }
}
/*

unsigned uploads: aah4gzsx

cloudName: roiedanino

API:
key: 759878166947577
secret: oHRfPYGXIGxrMtUxIvImwClf3bA

Environment variable:
cloudinary://759878166947577:oHRfPYGXIGxrMtUxIvImwClf3bA@roiedanino/


<input name="file" type="file"
   class="file-upload" data-cloudinary-field="image_id"
   data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"/>
 */
/*
 <CloudinaryContext cloudName="roiedanino">
    <Image publicId="sample" format="jpg">
        <Transformation crop="fill" gravity="faces" width="300" height="200"/>
    </Image>
</CloudinaryContext>
 */