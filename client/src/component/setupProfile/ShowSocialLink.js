
import React from 'react';
import ReactTooltip from 'react-tooltip';
import NoDetails from '../setupProfile/Nodetails'


const ShowSocialLink = (props) => {
    const { socialLink, deleteSocialLink } = props;
    return (
        <>{socialLink.length === 0 ? <NoDetails message="No Details Added !!" /> :
            <div className='container-fluid text-white p-2 mt-2 mb-2' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                <div className='container-row pt-3 pb-3 ps-5 pe-5'>
                    <div className='row text-center col-12 m-auto'>
                        <div className='m-auto'>
                            {
                                socialLink.map((obj, index) => {
                                    return (
                                        <SocialLinkIcon
                                            index={index}
                                            key={index}
                                            icon={obj.icon}
                                            link={obj.link}
                                            showDeleteBtn={true}
                                            onSelect={deleteSocialLink}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}



const SocialLinkIcon = (props) => {
    const { icon, index, link } = props;
    return (
        <div key={index} className="show-social-link-tab  m-2">
            {(icon === 'far fa-envelope fa-lg p-2') ?
                <a href={`mailto:${link}`} style={{ text: "center" }}  ><i className={icon} ></i></a> :
                <a href={link} style={{ text: "center" }} target='_blank' rel="noreferrer noopener" ><i className={icon} ></i></a>
            }
            {(props.showDeleteBtn) ? <>
                <i data-tip="Delete link" data-for='delete' className="fas fa-times p-1 fa-sm" onClick={() => props.onSelect(index)}></i>
                <ReactTooltip place="top" id='delete' type="error" effect="solid" />
            </> : ''}
        </div>
    )
}

export { ShowSocialLink, SocialLinkIcon };