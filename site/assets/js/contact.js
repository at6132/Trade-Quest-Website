<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us | TradeQuest</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <script defer src="assets/js/contact.js"></script>
</head>
<body>

    <header>
        <nav>
            <div class="logo">
                <a href="index.html"><img src="assets/images/logo.png" alt="TradeQuest Logo"></a>
            </div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="features.html">Features</a></li>
                <li><a href="roadmap.html">Roadmap</a></li>
                <li><a href="contact.html" class="active">Contact</a></li>
                <li><a href="https://tradequestfrontend.up.railway.app/signup" class="join-btn">Sign Up</a></li>
            </ul>
        </nav>
    </header>

    <section class="contact">
        <div class="contact-container">
            <h1>📩 Contact Us</h1>
            <p>We'd love to hear from you! Fill out the form below and we'll get back to you soon.</p>

            <form id="contact-form">
                <label for="name">Your Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your full name" required>

                <label for="email">Your Email Address:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>

                <label for="message">Your Message:</label>
                <textarea id="message" name="message" rows="4" placeholder="Type your message here..." required></textarea>

                <button type="submit" class="yellow-button">Send Message</button>
            </form>

            <p id="contact-response" class="hidden"></p>
        </div>
    </section>

    <footer>
        <p>© 2025 TradeQuest. All rights reserved.</p>
    </footer>

</body>
</html>
