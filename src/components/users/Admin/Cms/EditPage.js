import React, { Component } from 'react'
import { Redirect } from 'react-router';
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import axios from "axios";
import { APIURL } from '../../../constants/common';
import { Button, Input, Spinner } from 'reactstrap'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Global, css } from "@emotion/core";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#B8BCBD" : null,
            color: "grey",
        };
    }
};
const editorConfiguration = {
    toolbar: [ 
        'heading',
      '|',
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo',
    //   '|',
    //   'imageStyle:alignLeft',
    //   'imageStyle:alignCenter',
    //    'imageStyle:alignRight',
       ] ,
    ckfinder: {
      // Upload the images to the server using the CKFinder QuickUpload command
      // You have to change this address to your server that has the ckfinder php connector
      uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
  }
};


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            pageTitle: "",
            content: "",
            errMsg: "",
            scsMsg: "",
            Loader: true,
            redirectback: false,
            activeSide:false
        }
    }
    ckWrapperStyle = css`
    position: relative;
    z-index: 1;
    &::before {
      color: rgba(251, 50, 8, 1.0);
      content: attr(data-placeholder);
      position: absolute;
      margin: var(--ck-spacing-large) 0;
      top: 0;
      z-index: -1;
    }
  `;

    componentDidMount() {
        this.getProperties()
        window.scrollTo(0, 0);
        setTimeout(() => {
			this.setState({
				Loader:false
			})
		}, 500);
    }



    handleTitle = (e) => {
        this.setState({
            pageTitle: e
        });
    };
   
    handleChangeText(event) {
        this.setState({
            content: event
        })
        console.log(this.state.text)
    }

    getProperties = () => {
        var token = this.state.token
        const formData = new FormData();
        formData.append('cms_id', this.props.match.params.id);
        axios
            .post(APIURL + "admin/edit-cms-page", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("cms", response.data.data)
                const info = response.data.data
                this.setState({
                    pageTitle: info.page_title,
                    content: info.content
                })
            })
            .catch((error) => {
                // setTimeout(() => this.setState({ errMsg: "" }), 3000);
            });
    };

    onSubmitHandler = (e) => {
        window.scrollTo(0, 0);
        var token = this.state.token
        const { userInfo, user } = this.state;
        const formData = new FormData();
        formData.append('id', this.props.match.params.id);
        formData.append('page_title', this.state.pageTitle);
        formData.append('content', this.state.content);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/update-cms-page", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    scsMsg: response.data.message,
                    Loader: false,
                    // redirectback: true
                })
                this.UpdateSuccessfully(this.state.scsMsg)
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                })
            });
    };
    UpdateSuccessfully = (e) => toast.success(e, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        theme: "colored",
        onClose: () =>
            this.setState({
                redirectback: true
            })
    })
    sideMenu = (value) => {
        this.setState({
            activeSide:value
        })
    }

    render() {
        if (!this.state.user) {
            return <Redirect to="/signin" />;
        }
        if (this.state.redirectback) {
            return <Redirect to="/cms" />;
        }
        return (
            <>
                <div className="container-scroller resido-admin">
                    {this.state.Loader ? <div className="loader"> <Spinner type="border" color="dark" style={{ width: '3rem', height: '3rem' }} /> </div> : ""}
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Navbar
                     sideMenu={this.sideMenu.bind(this)}
                     activeSide={this.state.activeSide}
                      />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar 
                         sideMenu={this.sideMenu.bind(this)}
                         activeSide={this.state.activeSide}
                         activePage="contractToBuyer" 
                         />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="mb-4 d-flex justify-content-between">
                                    <h4 className="text-uppercase">{this.state.pageTitle}</h4>
                                </div>
                                <div className="row">
                                    <div className="col-12 grid-margin stretch-card">
                                        <div className="card">
                                            <div className="card">
                                                <div className="card-body">
                                                    <form className="forms-sample">
                                                        {/* <div className="row">
                                                            <div className="form-group col-lg-12 col-12">
                                                                <label htmlFor="exampleInputName1">Contract Title</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="Contract Title"
                                                                    value={this.state.pageTitle}
                                                                    onChange={(e) => this.handleTitle(e.target.value)}
                                                                />
                                                                <span className="text-danger">{this.state.errMsg.contract_title}</span>
                                                            </div>
                                                        </div> */}
                                                        <div className="row">
                                                            <div className="form-group col-lg-12 col-12">
                                                                <label htmlFor="exampleInputName1">Page Content</label>
                                                                <Global
                                                    styles={css`
                                            :root {
                                                
                                            --ck-border-radius: 4px;
                                            --ck-color-focus-border: rgba(142, 140, 140, 0.25);
                                            --ck-color-shadow-inner: rgba(142, 140, 140, 1);
                                            --ck-inner-shadow: 0 0 0 2px var(--ck-color-shadow-inner);
                                            --ck-spacing-large: var(--ck-spacing-standard);
                                            height: 200px;
                                            }
                                            .ck.ck-editor__editable_inline {
                                            border: 1px solid rgba(142, 140, 140, 0.25);
                                            transition: all 0.3s;
                                            color: rgba(19, 19, 18, 1);
                                            height: 200px;
                                            &:hover {
                                                border-color: rgba(19, 19, 18, 0.25);
                                                border-right-width: 1px !important;
                                              color: rgba(19, 19, 18, 1); !important;

                                            }
                                            }
                                            .ck-editor__editable.ck-read-only {
                                              color: rgba(19, 19, 18, 1);;
                                            opacity: 1;
                                            cursor: not-allowed;
                                             color: rgba(19, 19, 18, 1);
                                             height: 200px;
                                            &:hover {
                                                border-color: rgba(142, 140, 140, 0.25);
                                            }
                                            }
                                        `}
                                                />
                                                <CKEditor
								                    editor={ Editor }
								                    config={ editorConfiguration }
								                    data={this.state.content}
								                    onReady={ editor => {
								                        // You can store the "editor" and use when it is needed.
								                        console.log( 'Editor is ready to use!', editor );
								                    } }
								                    onChange={(event, editor) => {
								                        const data = editor.getData();
								                        this.handleChangeText(data)
								                        console.log({ event, editor, data });
								                    }}

								                    onBlur={ ( event, editor ) => {
								                        console.log( 'Blur.', editor );
								                    } }
								                    onFocus={ ( event, editor ) => {
								                        console.log( 'Focus.', editor );
								                    } }
								                />
                                                                {/* <textarea
                                                                    className="form-control"
                                                                    type="textarea"
                                                                    rows={10}
                                                                    placeholder="Page Content"
                                                                    value={this.state.content}
                                                                    onChange={(e) => this.handleContent(e.target.value)}
                                                                /> */}
                                                                <span className="text-danger">{this.state.errMsg.contract_title}</span>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            color="info"
                                                            className="btn btn-info mr-2"
                                                            onClick={() => this.onSubmitHandler()}
                                                        >Update</Button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
