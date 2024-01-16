import React, {useState} from 'react'
import "./style.scss";

export const SwitchTabs = ({useSwitchVal, options}) => 
{
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="switch-tabs">
            <div className="tab-items">
            {
                options.map((tab, ind) => 
                {
                    return (
                        <span 
                            key={ind}
                            className="tab-item"
                            onClick={() => 
                                {
                                    setActiveTab(100*ind)
                                    useSwitchVal(tab.toLowerCase())
                                }}
                        >{tab}</span>
                    );
                })
            }
            <span className="moving-bg" style={{left:activeTab}}/>
            </div>
        </div>
    )
}
