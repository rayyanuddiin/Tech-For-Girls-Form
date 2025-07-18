let shareCount = 0;
const maxShares = 5;

document.addEventListener("DOMContentLoaded", () => {
  const shareBtn = document.getElementById("whatsappShareBtn");
  const clickCount = document.getElementById("clickCount");
  const form = document.getElementById("registrationForm");
  const thankYouMessage = document.getElementById("thankYouMessage");

  if (localStorage.getItem("formSubmitted")) {
    form.style.display = "none";
    thankYouMessage.style.display = "block";
    return;
  }

  shareBtn.addEventListener("click", () => {
    if (shareCount < maxShares) {
      const message = "Hey Buddy, Join Tech For Girls Community";
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');

      shareCount++;
      clickCount.innerText = `Click count: ${shareCount}/${maxShares}`;

      if (shareCount === maxShares) {
        alert("Sharing complete. Please continue.");
      }
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (shareCount < maxShares) {
      alert("Please complete WhatsApp sharing before submitting.");
      return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const college = document.getElementById("college").value;
    const file = document.getElementById("screenshot").files[0];

    const reader = new FileReader();
    reader.onload = async function () {
      const fileData = reader.result;

      const formData = {
        name,
        phone,
        email,
        college,
        screenshotUrl: fileData
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby3YgzwmtCL7NoEFkoLVem1ZpGPhpUa1n3xLMM5B7Ow1YAt4D9k0GTf7wlDfQRbUycRjQ/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.ok) {
        localStorage.setItem("formSubmitted", "true");
        form.style.display = "none";
        thankYouMessage.style.display = "block";
      } else {
        alert("Submission failed. Try again.");
      }
    };

    reader.readAsDataURL(file);
  });
});
