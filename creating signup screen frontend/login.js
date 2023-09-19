const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");
const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUpBtn");
const loginBtn = document.getElementById("loginBtn");

signUp.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signIn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

async function postUserSignUp() {
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
  
    try {
      const response = await axios.post("http://localhost:3000/user/signUp", {
        name,
        email,
        password,
      });
  
      // Handle the response here
      console.log(response.data); // Assuming the server responds with JSON data
    } catch (error) {
      console.error(error);
    }
  }
  