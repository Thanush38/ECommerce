import React from 'react';
import './LoggedShow.css';
type LoggedShowProps = {
    email: string;
    logOut: () => void;
    image: string;
}
const LoggedShow = (props: LoggedShowProps) => {
    const getImagePicture = () => {
        console.log("props.image", props.image)
        if (props.image) {
            return <img src={props.image} alt="profile" className={"profileImage"} height={30} width={30} />
        }
        else {
            return (
                <svg className="user-img" viewBox="0 0 24 24">
                    <path
                        d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z">

                    </path>
                </svg>

            )
        }
    }
    return (
        <div>
            <button id="btn-message" className="button-message">
                <div className="content-avatar">
                <div className="status-user"></div>
                    <div className="avatar">
                        {getImagePicture()}

                    </div>
                </div>
                <div className="notice-content">
                    <div className="username">{props.email}</div>
                    <div className="lable-message">Thanush<span className="number-message">14</span></div>
                    <div className="user-id" onClick={props.logOut}>Log Out</div>
                </div>
            </button>
        </div>
    );
};

export default LoggedShow;
