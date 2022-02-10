import React, { Component } from 'react'
import { Row, Col, Spinner, Jumbotron, Label, Input, Button, Modal, ModalBody, ModalHeader, Table, ModalFooter } from 'reactstrap';
import axios from "axios";
import { APIURL } from '../../../constants/common';
import { Redirect, Link } from "react-router-dom";
// import { Helmet } from "react-helmet";

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef();
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            token: JSON.parse(localStorage.getItem("token")),
            selectedFiles: [],
            selectedVideo: [],
            selectedOptions: [],
            Images: [],
            tempArr: [],
            GallertData: [],
            removeId: "",
            scsMsg: "",
            errMsg: "",
            videoLink: "",
            Loader:false
        };
    }

    componentDidMount() {
        this.getGalleryImages()
    }

    fileSelectedHandler = (e) => {
        this.setState({
            selectedFiles: [...this.state.selectedFiles, ...e.target.files],

        }, () => {
            this.uploadImage();
            e.target.value = null;
        })

    }
    VideoSelectedHandler = (e) => {
        this.setState({
            selectedVideo: [...this.state.selectedVideo, ...e.target.files]
        }, () => {
            this.uploadImage();
            e.target.value = null;

        })

    }
    videoLink = (e) => {
        this.setState({
            videoLink: e
        })

    }

    getGalleryImages() {
        this.setState({
            selectedFiles: [],
        })
        this.forceUpdate()
        var token = this.state.token
        if (this.state.user) {
            this.setState({Loader:true})
            const formData = new FormData();
            formData.append('id', this.props.data.property_id);
            axios
                .post(APIURL + "seller/property-gallery-edit", formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'content-type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    console.log(response.data.data)
                    this.setState({
                        GalleryData: response.data.data,
                        Loader:false
                    })
                })
                .catch((error) => {
                    this.setState({
                        errMsg: error.response.data.errors,
                        Loader: false
                    })
                });
        }
    }
    handleRemoveTeamAttrs = (item) => {
        var token = this.state.token
        if (this.state.user) {
            const formData = new FormData();
            formData.append('id', item.id);
            axios
                .post(APIURL + "seller/delete-property-image", formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                .then((response) => {
                    console.log("removed Image", response.data.data)
                    this.setState({
                        scsMsg: response.data.data,
                        GalleryData: this.state.GalleryData.filter((s, sidx) => item.id !== s.id)
                    })
                })
                .catch((error) => {
                    this.setState({
                        errMsg: error.response.data.errors,
                        Loader: false
                    })
                });
        }
    }

    uploadImage = () => {
        window.scrollTo(0, 0);
        this.ref.current.value = ""
        const tempArr = [];
        var token = this.state.token;
        const formData = new FormData();
        formData.append('property_id', this.props.data.property_id);
        formData.append('video_link', this.state.videoLink)

        this.state.selectedFiles.forEach(file => {
            console.log("file >>> ", file);
            formData.append('upload_files[]', file)
        });

        this.state.selectedVideo.forEach(video => {
            console.log("file >>> ", video);
            formData.append('upload_video[]', video)
        });
        console.log("pictures >> ", tempArr);
        const option = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        };
        this.setState({ Loader: true })
        axios
            .post(APIURL + "seller/property-gallery-update", formData, option)
            .then(result => {
                console.log("result", result)
                this.setState({
                    Loader: false,
                    selectedFiles: [],
                    selectedVideo: [],
                    videoLink:""
                }, () => {
                    this.getGalleryImages()
                })
            })
            .catch(error => {
                console.log("err", error.response.data.error)
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    selectedFiles: [],
                })
                setTimeout(() => this.setState({
                    errMsg: "",
                }), 3000)
            }
            );
    }

    render() {

        return (
            <React.Fragment>
                {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                {this.state.errMsg.upload_files || this.state.errMsg.upload_video ?
                    <div className="alert alert-danger text-center" role="alert">
                        {this.state.errMsg.upload_files} {this.state.errMsg.upload_video}
                    </div>
                    : ""}
                <form className="mt-1 card">
                    <div className='position-absolute top-0 end-0'>
                        <Button onClick={(e) => this.uploadImage()} className='btn-sm px-4 btn-rounded btn btn-info'>Save</Button>
                    </div>
                    {/* Sub Heading */}
                    <div className="mb-3">
                        <label className="card-title border-bottom w-100 pb-3">Property Images</label>
                    </div>
                    {/* Sub Heading end */}
                    <div className="form-group w-auto">
                        <input
                            // style={{ lineHeight: "2.5" }}
                            type="file" ref={this.ref}
                            className="form-control form-control-sm"
                            multiple
                            onChange={this.fileSelectedHandler} />
                            <span>(Maximum. 20 images allowed)</span>
                    </div>
                    <div className="form-group multi-preview">
                        <div className="card">
                            {this.state.scsMsg}
                            <div className="list-group list-group-flush">
                                <div className="row">
                                    {this.state.GalleryData &&
                                        this.state.GalleryData.filter(data => data.type === "image").map((file, index) => (
                                            <div className="col-sm-3">
                                                <div className="img-gallery">
                                                    <img className="w-100 " src={file.url_path} />
                                                    <div>
                                                        <div className="img-delete">
                                                            <i style={{ cursor: "pointer" }} onClick={(e) => this.handleRemoveTeamAttrs(file)} className="cursor-pointer far fa-trash-alt"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-1">
                        <label className="pb-3 card-title border-bottom w-100">Property Video</label>

                    </div>
                    <div className="form-group w-auto">
                        <input
                            type="file" ref={this.ref}
                            className="form-control form-control-sm"
                            multiple
                            onChange={this.VideoSelectedHandler} />
                            <span>(Upload one property video)</span>
                    </div>
                    <div className="form-group multi-preview">
                        <div className="card">
                            {this.state.scsMsg}
                            <div className="list-group list-group-flush">
                                <div className="row">
                                    {this.state.GalleryData &&
                                        this.state.GalleryData.map((file, index) => (
                                            <div>
                                                {/* <img className="pro_img img-fluid w-100" src="https://via.placeholder.com/1200x800" alt="7.jpg" /> */}
                                                {
                                                    file.type === "video" ?
                                                        <div className="img-gallery" style={{ width: "200px", height: "200px" }}>
                                                            <video width="200" height="200" controls >
                                                                <source src={file.url_path} type="video/mp4" />
                                                            </video>
                                                            <div>
                                                                <div className="img-delete">
                                                                    <i style={{ cursor: "pointer" }} onClick={(e) => this.handleRemoveTeamAttrs(file)} className="cursor-pointer far fa-trash-alt"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                }

                                            </div>

                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-1">
                        <label className="pb-3 card-title border-bottom w-100">Property Video 3D</label>
                    </div>
                    <div className='row'>
                        <div className="form-group w-auto col-10">
                            <input
                                style={{ lineHeight: "2.5" }}
                                type="text"
                                placeholder='https://'
                                value={this.state.videoLink}
                                className="form-control form-control-sm"
                                onChange={(e) => this.videoLink(e.target.value)} />
                                <span>(Upload a 3D video link)</span>
                            {this.state.GalleryData &&
                                this.state.GalleryData.filter(data => data.type === "3d_video").map((file, index) => (
                                    <div className='img-gallery mt-1'>
                                        {file.file_path}
                                        <div className="img-delete">
                                            <i style={{ cursor: "pointer" }} onClick={(e) => this.handleRemoveTeamAttrs(file)} className="cursor_pointer far fa-trash-alt"></i>
                                        </div>
                                    </div>

                                ))}
                        </div>
                        <div className="form-group w-auto col-2">
                            <div className="form-group">
                                <Button className="btn-sm btn-info" onClick={(e) => this.uploadImage()} >Save</Button>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <Button className="btn btn-success mr-1" onClick={(e) => this.props.data.handleActiveTab("3")} ><i className="mdi mdi-arrow-left me-1"></i>Back to Features</Button>
                        </div>
                    </div>
                </form >
            </React.Fragment>
        )
    }
}
