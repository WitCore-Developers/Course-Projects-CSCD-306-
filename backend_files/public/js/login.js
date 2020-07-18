// const login = async() =>{
//   console.log("clicked")
//     var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const email = document.querySelector("#email").value
// const password = document.querySelector("#password").value

// var raw = JSON.stringify({"email":email,"password":password});

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("/user/login", requestOptions)
//   .then(response => response.json())
//   .then(result => {
//       if(result.token){
//         localStorage.setItem("auth-token",result.token)    
//         window.location.href = "./dashboard"
//       }else{
//         document.querySelector("#error").innerHTML = result.message
//       }
//     })
//     .catch(e => {
//       console.log(e)
//     })
// }