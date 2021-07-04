// window.addEventListener("load", function() {

//     document.addEventListener('click', function(e) {
//         if (e.target && e.target.matches(".edit-button")) {
//             const newName = document.getElementById("input-name").Value;
//             console.log(newName);
//             const newEmail = document.getElementById("input-email").value;
//             console.log(newEmail);

//             const payload = {
//                 name: newName,
//                 email: newEmail
//             };

//             const response = await fetch('http://localhost:3000/update-profile', {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body:JSON.stringify(payload)
//             });
//             const jsonResponse = await response.json();

//             document.getElementById("name").value = jsonResponse.name;
//             document.getElementById("email").value = jsonResponse.email;
//         }
//     })
// })