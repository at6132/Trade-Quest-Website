const featuresData = [
    {
        id: "feature1",
        title: "📊 Real-Time Market Data",
        description: `
            Gain access to the most up-to-date financial data with second-by-second updates.
            <ul>
                <li>View live order book movements</li>
                <li>Monitor institutional trade flows</li>
                <li>Spot liquidity pools in real-time</li>
            </ul>
            <p>In trading, timing is everything. The ability to act on real-time data allows traders to capture
            opportunities as they emerge and avoid costly delays. Whether you're monitoring forex, stocks, or crypto,
            our platform ensures you receive updates the second they happen.</p>
        `
    },
    {
        id: "feature2",
        title: "🧠 AI-Powered Trade Assistant",
        description: `
            Trade smarter with AI-driven insights and automated risk management.
            <h3>Why AI Matters?</h3>
            <p>Human emotions can lead to irrational trading decisions. AI helps by eliminating emotional biases and
            identifying high-probability trades.</p>
            <ul>
                <li>AI analyzes historical trade patterns to suggest optimal entry and exit points.</li>
                <li>Identifies emerging trends before they become obvious to human traders.</li>
                <li>Calculates risk-reward ratios and suggests safe position sizes.</li>
            </ul>
            <p>By leveraging machine learning, our AI Trade Assistant continuously learns from market conditions, giving
            you an edge over traders who rely purely on intuition.</p>
        `
    },
    {
        id: "feature3",
        title: "🏆 Competitive Trading",
        description: `
            Enter trading competitions and prove your skills in high-stakes environments.
            <ul>
                <li>Compete in daily, weekly, and monthly tournaments.</li>
                <li>Climb the leaderboards and earn exclusive rewards.</li>
                <li>Face off against top traders worldwide.</li>
            </ul>
            <h3>How Competitions Help You Improve</h3>
            <p>Friendly competition pushes traders to refine their skills. By tracking your performance against others,
            you can pinpoint weaknesses and optimize your strategy. With our competitive leaderboards, you'll always have
            new challenges to conquer.</p>
        `
    },
    {
        id: "feature4",
        title: "📉 Advanced Charting Tools",
        description: `
            Analyze the markets like a professional with state-of-the-art charting features.
            <h3>Powerful Tools Available</h3>
            <ul>
                <li>Over 100 technical indicators, including MACD, RSI, and Bollinger Bands.</li>
                <li>Customizable chart layouts for multi-timeframe analysis.</li>
                <li>Built-in trend recognition and pattern detection.</li>
            </ul>
            <p>Whether you're a day trader, swing trader, or long-term investor, our advanced charting tools give you
            everything you need to make informed decisions.</p>
        `
    },
    {
        id: "feature5",
        title: "📢 Social Trading Network",
        description: `
            Connect with other traders, share insights, and learn from the best.
            <h3>Key Features</h3>
            <ul>
                <li>Follow top traders and copy their trades.</li>
                <li>Engage in discussions and share market insights.</li>
                <li>Receive instant updates when top traders enter new positions.</li>
            </ul>
            <p>Trading doesn’t have to be a solo journey. Join a thriving community of professionals and beginners alike,
            all working toward one goal—trading success.</p>
        `
    },
    {
        id: "feature6",
        title: "⚡ High-Speed Order Execution",
        description: `
            Trade with millisecond execution speeds to stay ahead of the market.
            <h3>Why Speed Matters?</h3>
            <ul>
                <li>Reduces slippage and ensures orders are filled at intended prices.</li>
                <li>Improves profitability by securing the best possible entry and exit points.</li>
                <li>Vital for scalpers and high-frequency traders.</li>
            </ul>
            <p>When it comes to trading, fractions of a second can make a difference. Our platform ensures that your
            orders are executed at lightning speed, reducing the risk of missed opportunities.</p>
        `
    },
    {
        id: "feature7",
        title: "📈 Smart Trade Analytics",
        description: `
            Understand your trading habits and profitability trends with AI-powered analytics.
            <h3>What You'll Get:</h3>
            <ul>
                <li>Comprehensive breakdowns of your win/loss ratios.</li>
                <li>Insights into trading patterns and areas for improvement.</li>
                <li>Automatic risk assessment for every trade.</li>
            </ul>
            <p>Tracking your performance is the first step to improvement. Our analytics system identifies inefficiencies
            and provides actionable insights to refine your strategy.</p>
        `
    },
    {
        id: "feature8",
        title: "📡 Whale Watching & Institutional Tracking",
        description: `
            Monitor the moves of large investors and institutions in real-time.
            <h3>Features:</h3>
            <ul>
                <li>Instant alerts for large-volume trades.</li>
                <li>Track where big money is flowing.</li>
                <li>Identify potential market manipulation and liquidity shifts.</li>
            </ul>
            <p>Following smart money is one of the most effective strategies in trading. Our tracking tools help you stay
            ahead of the biggest players in the market.</p>
        `
    }
];

// Dynamically create feature cards and modals
const featuresContainer = document.getElementById("features-container");
const modalsContainer = document.getElementById("modals-container");

featuresData.forEach(feature => {
    // Create feature card
    const featureCard = document.createElement("div");
    featureCard.classList.add("feature-card");
    featureCard.innerHTML = `<h3>${feature.title}</h3>`;
    featureCard.onclick = () => openModal(feature.id);
    featuresContainer.appendChild(featureCard);

    // Create modal for feature
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = feature.id;
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('${feature.id}')">&times;</span>
            <h2>${feature.title}</h2>
            ${feature.description}
        </div>
    `;
    modalsContainer.appendChild(modal);
});

function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}
