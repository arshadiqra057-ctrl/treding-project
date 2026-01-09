import React, { useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import './ManageAssets.css';

const ManageAssets = () => {

    useEffect(() => {
        const container = document.getElementById('assets-calendar-widget');
        if (container) {
            container.innerHTML = '';

            // Required internal div for TradingView
            const widgetDiv = document.createElement('div');
            widgetDiv.className = 'tradingview-widget-container__widget';
            container.appendChild(widgetDiv);

            // Copyright attribution
            const copyrightDiv = document.createElement('div');
            copyrightDiv.className = 'tradingview-widget-copyright';
            copyrightDiv.innerHTML = '<a href="https://www.tradingview.com/economic-calendar/" rel="noopener nofollow" target="_blank"><span class="blue-text">Economic Calendar</span></a><span class="trademark"> by TradingView</span>';
            container.appendChild(copyrightDiv);

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "colorTheme": "light",
                "isTransparent": false,
                "locale": "en",
                "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
                "importanceFilter": "-1,0,1",
                "width": "100%",
                "height": 550
            });
            container.appendChild(script);
        }
    }, []);

    return (
        <DashboardLayout activePage="assets">
            <div className="manage-assets-container" style={{ padding: '0' }}>
                <div className="tradingview-widget-container" id="assets-calendar-widget"></div>
            </div>
        </DashboardLayout>
    );
};

export default ManageAssets;
