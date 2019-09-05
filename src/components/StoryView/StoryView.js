import React from 'react'

import {Tag, TagGroup, Divider} from "rsuite";
import './StoryView.css'
import ReactPlayer from 'react-player'
import ModalImage from "react-modal-image";


export default class StoryView extends React.Component {

    render() {
        const story = this.props.story;
        const mediaStyle = {maxWidth:'100%', maxHeight:'100%'};
        const styles = {width: '450px'};
        // width: '51px', height:'20px'
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
                <p className={'text'} style={{height: '200px',  overflowY:'scroll'}}>
                    {story.imageURL && <ModalImage  small={story.imageURL} large={story.imageURL} alt={story.title}/>}

                    {story.medium && <ReactPlayer style={mediaStyle} url={story.medium} playing controls={true}/>}
                    {story && story.content.split('\n').map(function(item, key) {
                        return (
                            <span key={key}>
                                {item}
                                <br/>
                            </span>
                        )
                    })}

                </p>


                <Divider  className={'divider'}/>

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