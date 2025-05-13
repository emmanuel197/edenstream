import React from "react";
import "../styles/Family.scss";

const DataFriendly = () => {
    return (
        <div className="family">
            <div className="container">
                <div className="inside-family data-friendly">
                    <div className="texts">
                        <h1>Data Friendly</h1>
                        <p>Save your data. Enjoy for longer. Watch at your preferred streaming quality.</p>
                    </div>
                    <div className="picture">
                        <img loading="lazy" src='/assets/device-mockup.png' alt="family-afriplay" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataFriendly;
