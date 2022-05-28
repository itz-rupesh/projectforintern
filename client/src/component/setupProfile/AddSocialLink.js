
import React from 'react';
import AddButton from '../support/SquareBtn';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';



const AddSocilaLink = (props) => {
    const { addSocialLinkIcon, socialIconHandler, socialLinkObj, socialLinkHandler } = props;
    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-4 mt-3' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            <div className='container-row'>
                <form onSubmit={addSocialLinkIcon}>
                    <div className='row  pt-4'>
                        <label htmlFor="sociallink" className="form-label ">Enter social links <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <div className='col-1 col-md-1'>
                            <DropdownButton
                                title={<i className={socialLinkObj.icon}></i>}
                                id="dropdown-menu-align-right"
                                onSelect={socialIconHandler}
                                size={"md"}
                            >
                                <Dropdown.Item eventKey="fas fa-globe fa-lg p-2"><i className="fas fa-globe fa-lg p-2"></i> website</Dropdown.Item>
                                <Dropdown.Item eventKey="fab fa-linkedin-in fa-lg p-2"><i className="fab fa-linkedin-in fa-lg p-2"></i> linked-in</Dropdown.Item>
                                <Dropdown.Item eventKey="fab fa-github fa-lg p-2"> <i className="fab fa-github fa-lg p-2"></i>github</Dropdown.Item>
                                <Dropdown.Item eventKey="fab fa-hackerrank fa-lg p-2"> <i className="fab fa-hackerrank fa-lg p-2"></i>hackerrank</Dropdown.Item>
                                <Dropdown.Item eventKey="fab fa-twitter fa-lg p-2"><i className="fab fa-twitter fa-lg p-2"></i>twitter</Dropdown.Item>
                                <Dropdown.Item eventKey="fab fa-instagram fa-lg p-2"><i className="fab fa-instagram fa-lg p-2"></i>instagram</Dropdown.Item>
                                <Dropdown.Item eventKey="fab fa-facebook fa-lg p-2"><i className="fab fa-facebook fa-lg p-2"></i>facebook</Dropdown.Item>
                                <Dropdown.Item eventKey="far fa-envelope fa-lg p-2"><i className="far fa-envelope fa-lg p-2"></i>mail</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="fas fa-link fa-lg p-2"><i className="fas fa-link fa-lg p-2"></i>other</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className='col-11 col-md-9 ps-5 ps-md-4 ps-lg-0'>
                            <input className="form-control" type={socialLinkObj.icon === 'far fa-envelope fa-lg p-2' ? "email" : "url"} id="supportiveDoc" name='supportiveDoc' placeholder={socialLinkObj.icon === 'far fa-envelope fa-lg p-2' ? "example@gmail.com" : 'https://example.com/user-id'} value={socialLinkObj.link} onChange={socialLinkHandler} required />
                        </div>
                        <div className='col-12 col-md-2 pt-3 pt-md-0 text-end'>
                            <AddButton title="Add" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSocilaLink;