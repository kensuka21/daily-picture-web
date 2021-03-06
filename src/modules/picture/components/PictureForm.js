import React from "react";
import NoPictureUploaded from "./NoPictureUploaded";
import styled from 'styled-components';
import ResponsiveImage from "./ResponsiveImage";
import VisibleDiv from "../../common/components/VisibleDiv";

const UploadPictureSection = styled.div`
    cursor: pointer;
    display: ${props => props.visible ? 'block' : 'none'}
`;

const SelectedPictureSection = styled.div`
    display: ${props => props.visible ? 'block' : 'none'};
`;

const TextareaSection = styled.div`
    width: 700px;
    margin: 0 auto;
`;


class PictureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleSelectPicture: true,
            selectedPictureUrl: ''
        }
    }

    componentDidMount() {
        $('#caption').characterCounter();
    }

    onClickUploadPictureHandler = (e) => {
        this.fileInput.click();
    };

    onInputFileChangeHandler = (evt) => {
        if (!this.state.visibleSelectPicture)
            return;

        this.setState({
            visibleSelectPicture: false,
            selectedPictureUrl: URL.createObjectURL(evt.target.files[0])
        });

        this.props.onPictureSelected(evt.target.files[0]);
    };

    resetForm = () => {
        this.setState({
            visibleSelectPicture: true,
            selectedPictureUrl: ''
        });
    };


    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <UploadPictureSection visible={this.state.visibleSelectPicture}>
                    <NoPictureUploaded className="center" onClick={this.onClickUploadPictureHandler}
                                       title="Click here to upload your daily picture !"/>

                    <div className="hide">
                        <input type="file"
                               onChange={this.onInputFileChangeHandler}
                               ref={(input) => {
                                   this.fileInput = input;
                               }}/>
                    </div>
                </UploadPictureSection>

                <SelectedPictureSection className="center" visible={!this.state.visibleSelectPicture}>
                    <ResponsiveImage imageUrl={this.state.selectedPictureUrl}/>

                    <br/>
                    <br/>

                    <div className="row">
                        <div className="col s12">
                            <VisibleDiv visible={!this.props.isUploadingPicture}>
                                <div className="row">
                                    <TextareaSection className="input-field">
                                    <textarea
                                        id="caption"
                                        placeholder="Enter caption here..."
                                        className="materialize-textarea"
                                        value={this.props.picture.caption}
                                        onChange={this.props.onCaptionInputChangeHandler}
                                        data-length="120"/>
                                        <br/>
                                        <label htmlFor="caption">Caption</label>
                                    </TextareaSection>
                                </div>

                                <button onClick={this.resetForm}
                                        className="btn waves-effect waves-light white black-text" type="reset"
                                        name="action">Cancel
                                    <i className="material-icons right">cancel</i>
                                </button>
                                <span> </span>
                                <button className="btn waves-effect waves-light blue" type="submit" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </VisibleDiv>

                            <VisibleDiv visible={this.props.isUploadingPicture} className="progress">
                                <div className="indeterminate"/>
                            </VisibleDiv>
                        </div>
                    </div>
                </SelectedPictureSection>
            </form>
        )
    }
}

export default PictureForm;