function registerData() {

    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let day = $("#day").val();
    let month = $(".dropdown-item.active").text(); 
    let year = $("#year").val();
    let password = $("#password").val();


	 const months = {
        "Enero": "01", "Febrero": "02", "Marzo": "03", "Abril": "04", 
        "Mayo": "05", "Junio": "06", "Julio": "07", "Agosto": "08", 
        "Septiembre": "09", "Octubre": "10", "Noviembre": "11", "Diciembre": "12"
    };

	let formattedMonth = months[month];
    let formattedDate = `${day.padStart(2, '0')}-${formattedMonth}-${year}`; 



	 let data = {
		 nombres: firstname,
		 apellidos: lastname,
		 fecha_nacimiento: formattedDate,
		 password: password
	 }

	 $.ajax({

		 url: "http://127.0.0.1:5000/users",  
		 type:"POST",
		 contentType:"application/json",
		 dataType:"json",

		 data:JSON.stringify(data),
		
		 success: function(rta) {
			 console.log(rta);
			 $("#firstname").val("");
			 $("#lastname").val("");
			 $("#day").val("");
			 $("#year").val("");
			 $("#password").val("");
			 window.location.replace("index.html")
		 },
		 error: function(xhr, status) {
			 alert('Error en la petición');
		 }
		 complete: function(xhr, status) {
			 alert('Petición realizada');
		 }

	 });
 }
function showUsers() {
    $.ajax({
        url: "http://127.0.0.1:5000/users", 
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function(users) {
            let userList = $("#userList");
            userList.empty();
            users.forEach(user => {
                userList.append(`<li>${user.nombres} ${user.apellidos}</li>`);
            });
        },
        error: function(xhr, status) {
            alert('Disculpe, existió un problema al obtener los usuarios');
        }
    });
}

function selectMonth(month) {
	document.getElementById('monthDropdown').innerText = month;
	



	
}



 
 