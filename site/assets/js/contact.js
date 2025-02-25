document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {
        const response = await fetch("https://tradequestbackend.up.railway.app/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById("contact-response").textContent = result.message;
        document.getElementById("contact-response").classList.remove("hidden");

        // Clear form fields after successful submission
        if (response.ok) {
            document.getElementById("contact-form").reset();
        }

    } catch (error) {
        document.getElementById("contact-response").textContent = "Something went wrong. Try again!";
        document.getElementById("contact-response").classList.remove("hidden");
    }
});
