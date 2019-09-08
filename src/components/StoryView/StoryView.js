import React from 'react'

import {Tag, TagGroup, Divider, Icon} from "rsuite";
import './StoryView.css'
import ReactPlayer from 'react-player'
import ModalImage from "react-modal-image";
import {Modal} from "rsuite";


export default class StoryView extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            expand: false
        }
    }


    render() {
        const story = this.props.story;
        const mediaStyle = {maxWidth:'100%', maxHeight:'100%'};
        const deleteStory = this.props.deleteStory;
        const expand = this.props.expandStory;
        const toggleExpand = this.props.toggleExpand;
        const styles = expand ? {width:'100%', height:'100%', maxHeight:'100%'} : {width: '450px'};
        const textHeight = expand ? '400px' : '200px';

        let imageComponent = <ModalImage small={story.imageURL} style={{maxHeight: '200px'}} large={story.imageURL} alt={story.title}/>;

        return (

            <div className={"textAlignment"} style={styles}>
                <br style={{height:1}}/>
                <span className={'author'}> {story && `\n` + story.author} </span>
                <img src={'icons/follow-icon-05.svg'} alt={''} style={{float: "left", width: '51px', height:'35px'}}/>
                <Divider className={'vert-divider'} vertical/>
                <Divider className={'vert-divider'} vertical/>

                <Divider style={{height: '2px', marginTop: '8px', marginBottom: '8px', backgroundColor:'var(--primary-color)'}}/>

                <span className={'title'}>{story && <strong>{story.title}</strong>}</span>
                <span className={'year'}>{story && story.year}</span>

                <Divider className={'vert-divider bottom'} vertical/>
                <Divider className={'vert-divider bottom'} vertical/>

                {story && story.address && <h5 className={"address"}>
                    <img src={story.iconPath} style={{width:'32px', height:'32px'}} alt={''}/>
                    {story.address}
                </h5>}
                <div style={{height: textHeight,  overflowY:'scroll'}}>
                    {story.imageURL && imageComponent }
                    {story.medium && <ReactPlayer style={mediaStyle} url={story.medium} playing controls={true}/>}

                    <p className={'text'} >

                        {story && story.content.split('\n').map(function(item, key) {
                            return (
                                <span key={key}>
                                    {item}
                                    <br/>
                                </span>
                            )
                        })}

                    </p>
                </div>

                <Divider  className={'divider'}/>
                <Icon style={{float: "left"}} icon='trash-o' onClick={() => deleteStory(story)} size="lg"/>
                {
                    !expand && <Icon icon='expand' style={{float:'left', marginLeft:'7px'}} onClick={() => toggleExpand()}/>
                }

                <TagGroup>
                        {story && story.tags.map((tag, index) =>
                            <span key={index}>
                            <Tag className={'fill-color'}> {tag} </Tag>
                                &nbsp;
                            </span>
                        )}
                </TagGroup>
            </div>

        );
    }
}
//<img style={mediaStyle} src={story.imageURL} alt={'enable pictures on your browser'}/>