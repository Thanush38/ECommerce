import React from 'react';
import './Cards.css';
type Props = {
    title: string;
    content: string;
    available: string;
    functionCall: (content:string) => void;
};

const Cards: React.FC<Props> = (props) => {
    const handleClick = () => {
        props.functionCall(props.title);
    }
    return (
        <div>
            <div className="parentCard">
                <div className="sectionCard">
                    <div className="content-box">
                        <span className="card-title">{props.title}</span>
                        <p className="card-content">
                            {props.content}
                        </p>
                        <span className="see-more" onClick={handleClick}>Browse</span>
                    </div>
                    <div className="date-box">
                        <span className="month">Available</span>
                        <span className="date">{props.available}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
