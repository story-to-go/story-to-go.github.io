import React from 'react';
import './App.css';
import { Navbar, Nav, Modal, Icon, AutoComplete, InputGroup, Divider} from 'rsuite';
import StoryToGoMap from "./components/StoryToGoMap/StoryToGoMap";
import AddStoryWindow from "./components/AddStoryWindow/AddStoryWindow";
import {Slider} from 'antd'

import 'antd/es/slider/style/css';
import Options from "./components/OptionsDrawer/Options";
import AboutModal from "./components/About/AboutModal"; // for css
class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showAddStory: false,
            goToMyLocation: false,
            clickedAddress: null,
            clickedLatLng:null,
            stories: [],
            showStory: false,
            selectedStory: null,
            searchText:'',
            yearsFilter: {
                start: 1900,
                end:2019
            },
            showOptions:false,
            showAbout:false
        };
    }


    toggleAddStory(){
        this.setState({showStory: false, showAddStory: !this.state.showAddStory});
    }

    toggleShowOptions(){
        this.setState({showOptions: !this.state.showOptions});
    }

    toggleAbout(){
        this.setState({showAbout: !this.state.showAbout});
    }

    addStory(address, latlng){
        this.setState({clickedAddress: address, clickedLatLng: latlng});
        this.toggleAddStory();
    }

    onStorySubmitted(story){
        let stories = this.state.stories;
        stories.push(story);

        let showAddStory = !this.state.showAddStory;
        this.setState({stories, showAddStory});
        localStorage.setItem('stories', JSON.stringify(this.state.stories));

    }

    onInputChanged(text, e){
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        let stories = JSON.parse(localStorage.getItem('stories')) || [];
        if(stories == null)
            stories = [];
        this.setState({stories});
    }

    onSliderChange(value){
        let start = value[0];
        let end = value[1];

        if(start > end){
            start = value[1];
            end = value[0];
        }

        this.setState({ yearsFilter: {start, end} });
    }

    navigationBar(){
        const styles = {
            width: 300,
            top: '50%',
            transform: 'translateY(-25%)',

        };
        const bound1 = `${this.state.yearsFilter.start}`;
        const bound2 = `${this.state.yearsFilter.end}`;
        const marks = {
            [bound1]: bound1,
            [bound2]: bound2

        };
        return (  <Navbar style={{backgroundColor: 'white'}}>
                <Navbar.Header>

                </Navbar.Header>
                <Navbar.Body >
                    <Nav className="navItem addStory" pullRight>
                        <a href="/" className="navbar-brand logo brandLogo">
                            <img src="logo/logo.png" alt={'logo'} style={{width:'378px', height:'46px'}}/>
                        </a>
                        <Nav.Item onClick={() => this.toggleAddStory()}> + הוסיפו סיפור</Nav.Item>
                        <Nav.Item onClick={() => this.toggleAbout()}>אודות</Nav.Item>

                    </Nav>

                    <Nav >
                        <Nav.Item className="navItem" onClick={this.toggleShowOptions.bind(this)}
                                  icon={<img src={"icons/blue-lines-06.svg"} alt={''}
                                             style={{height:'40px',transform:'translateY(-20%)'}}/>}>
                        </Nav.Item>
                        <Nav.Item>
                            <InputGroup style={styles}>
                                <AutoComplete placeholder={"מחבר / מקום / תגיות / מדיום"} name={"searchText"}
                                              data={this.state.stories && this.state.stories.flatMap(story => story && story.title)}
                                              onChange={this.onInputChanged.bind(this)}/>
                                <InputGroup.Addon>
                                    <Icon className="navItem" icon="search" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </Nav.Item>
                        <Nav.Item  style={{minWidth: '250px'}}>
                            <Slider
                                className={'yearSlider'}
                                marks={marks}
                                range
                                min={1900}
                                max={2019}
                                defaultValue={[1900, 2019]}
                                value={[this.state.yearsFilter.start, this.state.yearsFilter.end]}
                                onChange={this.onSliderChange.bind(this)}
                                style={{top:'50%', transform:'translateY(-120%)', width: '200px'}}
                                tooltipVisible={false}
                            />
                        </Nav.Item>
                    </Nav>


                </Navbar.Body>

            </Navbar>

        )
    }

    onStorySelected(story){
        this.setState({
            showStory: true,
            selectedStory: story
        });
    }

    clickAwayStoryView(){
        this.setState({
            showStory: false,
            selectedStory: null
        });
    }

    getFilteredStories(){

        if(!this.state.stories)
            return [];

        return this.state.stories.filter(story => {
            let key;
            let result = false;
            for (key in story) {
                if (story.hasOwnProperty(key) && story[key].toString().includes(this.state.searchText)
                    && story.year >= this.state.yearsFilter.start && story.year <= this.state.yearsFilter.end
                ) {
                    result = true;
                    break;
                }
            }

            return result;
        });
    }

    addStories(newStories) {
        let stories = this.state.stories;
        stories.push(newStories);
        this.setState({stories});
    }

    deleteAllStories() {
        localStorage.setItem('stories', '[]');
        this.setState({stories:[]});
    }

    render() {
        return (
            <div className="App">
                <Modal className={"modal"} onHide={() => this.toggleAddStory()} show={this.state.showAddStory} full={true} autoFocus={true}>
                    <AddStoryWindow address={this.state.clickedAddress} latlng={this.state.clickedLatLng} toggle={this.toggleAddStory.bind(this)}
                                    onSubmitStory={this.onStorySubmitted.bind(this)}/>
                </Modal>

                {this.navigationBar()}

                <Divider style={{backgroundColor:'#2D8FC7', margin:'0px', height: '5px'}}/>

                <StoryToGoMap onStorySelected={this.onStorySelected.bind(this)}
                              clickAwayStoryView={this.clickAwayStoryView.bind(this)}
                              showMyLocation={this.state.goToMyLocation}
                              stories={this.getFilteredStories()}
                              toggleAddStory={(address, latlng) => this.addStory(address, latlng)}/>

                <Options show={this.state.showOptions} close={this.toggleShowOptions.bind(this)} stories={this.state.stories}
                        addStories={this.addStories.bind(this)} deleteAllStories={this.deleteAllStories.bind(this)}/>

                <Modal show={this.showAbout} onHide={() => this.toggleAbout()} autoFocus={true} full>
                    <AboutModal/>
                </Modal>
            </div>
        );
    }
}

export default App;
