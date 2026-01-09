import React, { useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import './AllStocks.css';

const AllStocks = () => {

    useEffect(() => {
        const container = document.getElementById('all-stocks-widget');
        if (container) {
            container.innerHTML = '';

            // Create the widget container div required by TradingView
            const widgetDiv = document.createElement('div');
            widgetDiv.className = 'tradingview-widget-container__widget';
            container.appendChild(widgetDiv);

            // Create the copyright div (optional but good for compliance)
            const copyrightDiv = document.createElement('div');
            copyrightDiv.className = 'tradingview-widget-copyright';
            copyrightDiv.innerHTML = '<a href="https://www.tradingview.com/markets/stocks-usa/" rel="noopener nofollow" target="_blank"><span class="blue-text">Stocks today</span></a><span class="trademark"> by TradingView</span>';
            container.appendChild(copyrightDiv);

            // Create the script element
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "exchange": "US",
                "colorTheme": "light",
                "dateRange": "ALL",
                "showChart": true,
                "locale": "en",
                "largeChartUrl": "",
                "isTransparent": true,
                "showSymbolLogo": false,
                "showFloatingTooltip": true,
                "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
                "plotLineColorFalling": "rgba(41, 98, 255, 1)",
                "gridLineColor": "rgba(240, 243, 250, 0)",
                "scaleFontColor": "#0F0F0F",
                "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
                "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
                "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
                "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
                "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
                "width": "100%",
                "height": "550"
            });
            container.appendChild(script);
        }
    }, []);

    return (
        <DashboardLayout activePage="stocks">
            <div className="all-stocks-page-inner" style={{ padding: '0' }}>
                <div className="tradingview-widget-container" id="all-stocks-widget"></div>
            </div>
        </DashboardLayout>
    );
};

export default AllStocks;
