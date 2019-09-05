import React from 'react'
import {Drawer, Button, Divider} from "rsuite";
import './Options.css'
export default class Options extends React.Component {



   exportToJson(objectData) {
        let filename = "storyToGo.json";
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            let a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    onUploadFile(event){
        let json;
        let files = event.target.files; // FileList object
        // files is a FileList of File objects. List some properties.
        for (let i = 0, f; f = files[i]; i++) {
            let reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = ((theFile) => {
                return (e) => {
                    try {
                        json = JSON.parse(e.target.result);
                        console.log(JSON.stringify(json));
                        localStorage.setItem('stories', JSON.stringify(json));

                        alert('הסיפורים נטענו בהצלחה!');
                        window.location.reload();
                    } catch (ex) {
                        alert('שגיאה בעת העלאת הקובץ...' + ex);
                    }
                }
            })(f);
            reader.readAsText(f);
        }

    }


    render() {

        let show = this.props.show;
        let close = this.props.close;
        let stories = this.props.stories;
        let deleteStories = this.props.deleteAllStories;
        return (
            <Drawer
                size={'xs'}
                show={show}
                onHide={close}
                placement={'left'}
            >
                <Drawer.Header>
                    <h1 className={'title header'}>אפשרויות</h1>
                </Drawer.Header>
                <Drawer.Body>
                    <h2 className={' header'}>שמירת הסיפורים</h2>
                    <Button onClick={() => this.exportToJson(stories)} className={"button"}>שמירה כקובץ</Button>
                    <Divider className={'options-divider'}/>
                    <h2 className={' header'}>טעינת הסיפורים</h2>

                    <input className={'inputFile'} type="file" id="file" name="file" accept=".json" onChange={this.onUploadFile.bind(this)}/>
                    <label className={'button'} htmlFor="file">טעינה מקובץ</label>

                    {/*<Uploader action="//jsonplaceholder.typicode.com/posts/" />*/}
                    <Divider className={'options-divider'}/>

                    <h2 className={' header'}>מחיקת כל הסיפורים</h2>

                    <Button className={'button'} onClick={() => deleteStories()}>מחק</Button>

                    <Divider className={'options-divider'}/>

                </Drawer.Body>
                <Drawer.Footer style={{float:'left'}}>

                    <Button onClick={close} className={"button"} appearance="primary">
                        חזרה
                    </Button>

                </Drawer.Footer>
            </Drawer>);
    }
}